import { execFile } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import {
  AMUSING_FULL_PODCAST,
  getPodcastEpisodeByBookSlug,
} from '../../content/podcast/registry.ts';
import type {
  PodcastEpisode,
  PodcastStatusResponse,
  PodcastTtsProvider,
  ProviderTrackState,
  SegmentTiming,
} from '../../content/podcast/types.ts';
import {
  formatEdgeRate,
  getEffectiveRatePercent,
  toEdgeTtsChunks,
  toFishAudioChunks,
  toFishSpeed,
} from '../../content/podcast/script.ts';

const execFileAsync = promisify(execFile);

const FFMPEG_BIN = process.env.FFMPEG_PATH?.trim() || ffmpegStatic || 'ffmpeg';
const FFPROBE_BIN = process.env.FFPROBE_PATH?.trim() || ffprobeStatic?.path || 'ffprobe';
const ARTIFACTS_DIR = path.resolve(process.cwd(), 'artifacts');
const TTS_CACHE_ROOT = path.resolve(process.cwd(), '.cache', 'podcast');

function buildSpeechChunkCacheKey(params: {
  provider: PodcastTtsProvider;
  voiceKey: string;
  ratePercent: number;
  pitch?: string;
  temperature?: number;
  topP?: number;
  text: string;
}): string {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify({ v: 2, ...params }))
    .digest('hex')
    .slice(0, 24);
}

async function fileExistsNonEmpty(filePath: string, minBytes = 44): Promise<boolean> {
  try {
    const stat = await fs.stat(filePath);
    return stat.size > minBytes;
  } catch {
    return false;
  }
}

function getBookPodcastDir(bookSlug: string): string {
  return path.join(ARTIFACTS_DIR, bookSlug, 'podcast');
}

function getTrackFilenames(
  provider: PodcastTtsProvider
): { mp3: string; timings: string } {
  return {
    mp3: `${provider}.mp3`,
    timings: `${provider}.timings.json`,
  };
}

export function isFishApiKeyConfigured(): boolean {
  const key = process.env.FISH_API_KEY?.trim();
  return Boolean(key && key !== 'MY_FISH_API_KEY');
}

async function withRetry<T>(
  operation: () => Promise<T>,
  label: string,
  maxAttempts = 4
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        const delayMs = 1000 * 2 ** (attempt - 1);
        console.warn(
          `[tts-retry] ${label} attempt ${attempt}/${maxAttempts} failed (${error instanceof Error ? error.message : String(error)}), retrying in ${delayMs}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;

  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (true) {
      const idx = cursor;
      cursor += 1;
      if (idx >= items.length) break;
      results[idx] = await worker(items[idx], idx);
    }
  });

  await Promise.all(runners);
  return results;
}

async function probeDurationSeconds(filePath: string): Promise<number> {
  const { stdout } = await execFileAsync(FFPROBE_BIN, [
    '-v',
    'error',
    '-show_entries',
    'format=duration',
    '-of',
    'default=noprint_wrappers=1:nokey=1',
    filePath,
  ]);
  const parsed = Number.parseFloat(stdout.trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

async function decodeToWav(inputPath: string, outputWavPath: string): Promise<void> {
  await execFileAsync(FFMPEG_BIN, [
    '-y',
    '-i',
    inputPath,
    '-ar',
    '24000',
    '-ac',
    '1',
    '-c:a',
    'pcm_s16le',
    outputWavPath,
  ]);
}

async function createSilenceWav(durationMs: number, outputWavPath: string): Promise<void> {
  const sec = Math.max(0.05, durationMs / 1000).toFixed(3);
  await execFileAsync(FFMPEG_BIN, [
    '-y',
    '-f',
    'lavfi',
    '-i',
    'anullsrc=r=24000:cl=mono',
    '-t',
    sec,
    '-c:a',
    'pcm_s16le',
    outputWavPath,
  ]);
}

async function concatWavListToMp3(wavFiles: string[], outMp3Path: string): Promise<void> {
  const listFile = `${outMp3Path}.concat.txt`;
  const tmpOutPath = `${outMp3Path}.tmp.mp3`;
  const listContent = wavFiles.map((f) => `file '${f.replace(/'/g, "'\\''")}'`).join('\n');
  await fs.writeFile(listFile, listContent, 'utf8');

  try {
    await execFileAsync(
      FFMPEG_BIN,
      [
        '-y',
        '-f',
        'concat',
        '-safe',
        '0',
        '-i',
        listFile,
        '-af',
        'loudnorm=I=-16:TP=-1.5:LRA=11',
        '-codec:a',
        'libmp3lame',
        '-b:a',
        '128k',
        '-ar',
        '24000',
        '-ac',
        '1',
        tmpOutPath,
      ],
      { maxBuffer: 16 * 1024 * 1024 }
    );
    await fs.rename(tmpOutPath, outMp3Path);
  } finally {
    await fs.rm(listFile, { force: true });
    await fs.rm(tmpOutPath, { force: true });
  }
}

async function synthesizeEdgeSpeechBuffer(
  text: string,
  voice: string,
  ratePercent: number,
  pitch = '+0Hz'
): Promise<Buffer> {
  return withRetry(async () => {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
    const { audioStream } = tts.toStream(text, {
      rate: formatEdgeRate(ratePercent),
      pitch,
    });
    const chunks: Buffer[] = [];
    for await (const chunk of audioStream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const merged = Buffer.concat(chunks);
    if (merged.length === 0) {
      throw new Error('Edge TTS returned empty audio buffer');
    }
    return merged;
  }, `EdgeTTS(${voice})`);
}

async function synthesizeFishSpeechBuffer(
  text: string,
  referenceId: string,
  ratePercent: number,
  apiKey: string,
  options: { temperature?: number; topP?: number } = {}
): Promise<Buffer> {
  return withRetry(async () => {
    const response = await fetch('https://api.fish.audio/v1/tts', {
      method: 'POST',
      signal: AbortSignal.timeout(45_000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        model: 's2.1-pro-free',
      },
      body: JSON.stringify({
        text,
        reference_id: referenceId,
        format: 'mp3',
        chunk_length: 250,
        ...(typeof options.temperature === 'number' ? { temperature: options.temperature } : {}),
        ...(typeof options.topP === 'number' ? { top_p: options.topP } : {}),
        prosody: {
          speed: toFishSpeed(ratePercent),
          volume: 0,
        },
      }),
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      throw new Error(`Fish Audio API error (${response.status}): ${errBody.slice(0, 240)}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buf = Buffer.from(arrayBuffer);
    if (buf.length === 0) {
      throw new Error('Fish Audio API returned empty audio buffer');
    }
    return buf;
  }, `FishAudio(${referenceId.slice(0, 8)})`);
}

interface TimingsFilePayload {
  bookSlug: string;
  provider: PodcastTtsProvider;
  modelName: string;
  generatedAt: string;
  durationSec: number;
  timings: SegmentTiming[];
}

export interface SynthesizeOptions {
  useCache?: boolean;
}

export async function synthesizePodcastEpisode(
  provider: PodcastTtsProvider,
  episodeOrSlug: PodcastEpisode | string = AMUSING_FULL_PODCAST,
  onProgress?: (msg: string) => void,
  options: SynthesizeOptions = {}
): Promise<ProviderTrackState> {
  const useCache = options.useCache !== false;
  const episode =
    typeof episodeOrSlug === 'string'
      ? getPodcastEpisodeByBookSlug(episodeOrSlug)
      : episodeOrSlug;

  if (!episode) {
    throw new Error(`未找到书目 ${String(episodeOrSlug)} 对应的播客演播稿。`);
  }

  if (provider === 'fish' && !isFishApiKeyConfigured()) {
    throw new Error('FISH_API_KEY 尚未配置，无法调用 Fish Audio s2.1-pro-free API。');
  }

  const fishApiKey = process.env.FISH_API_KEY?.trim() ?? '';
  const podcastDir = getBookPodcastDir(episode.bookSlug);
  const cacheDir = path.join(TTS_CACHE_ROOT, provider);
  await fs.mkdir(podcastDir, { recursive: true });
  if (useCache) {
    await fs.mkdir(cacheDir, { recursive: true });
  }
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), `podcast-${episode.bookSlug}-${provider}-`));

  try {
    const totalSegments = episode.segments.length;
    const concurrency = 4;
    let completedCount = 0;
    let cacheHits = 0;
    let cacheMisses = 0;

    interface BuiltSegmentArtifact {
      segmentId: string;
      hostId: 'A' | 'B';
      wavPaths: string[];
      speechDurationSec: number;
      gapWavPath: string | null;
      gapDurationSec: number;
    }

    const segmentArtifacts = await mapWithConcurrency(
      episode.segments,
      concurrency,
      async (seg, idx): Promise<BuiltSegmentArtifact> => {
        const host = episode.hosts[seg.hostId];
        const chunks =
          provider === 'edge'
            ? toEdgeTtsChunks(seg.scriptText)
            : toFishAudioChunks(seg.scriptText, host.fishDefaultToneTag);

        const segPrefix = String(idx + 1).padStart(3, '0');
        const wavPaths: string[] = [];
        let speechDurationSec = 0;

        for (let cIdx = 0; cIdx < chunks.length; cIdx += 1) {
          const chunk = chunks[cIdx];
          const chunkTag = `${segPrefix}-${String(cIdx + 1).padStart(2, '0')}`;
          const wavPath = path.join(tempDir, `${chunkTag}.wav`);

          if (chunk.kind === 'silence') {
            await createSilenceWav(chunk.silenceMs ?? 350, wavPath);
          } else if (chunk.text) {
            const effectiveRate = getEffectiveRatePercent(seg, provider, episode);
            const voiceKey = provider === 'edge' ? host.edgeVoice : host.fishReferenceId;
            const edgePitch = host.edgePitch ?? '+0Hz';
            const cacheKey = buildSpeechChunkCacheKey({
              provider,
              voiceKey,
              ratePercent: effectiveRate,
              ...(provider === 'edge' ? { pitch: edgePitch } : {}),
              ...(provider === 'fish'
                ? { temperature: host.fishTemperature, topP: host.fishTopP }
                : {}),
              text: chunk.text,
            });
            const cachedWavPath = path.join(cacheDir, `${cacheKey}.wav`);

            if (useCache && (await fileExistsNonEmpty(cachedWavPath))) {
              await fs.copyFile(cachedWavPath, wavPath);
              cacheHits += 1;
            } else {
              const rawMp3Path = path.join(tempDir, `${chunkTag}.mp3`);
              const audioBuf =
                provider === 'edge'
                  ? await synthesizeEdgeSpeechBuffer(
                      chunk.text,
                      host.edgeVoice,
                      effectiveRate,
                      edgePitch
                    )
                  : await synthesizeFishSpeechBuffer(
                      chunk.text,
                      host.fishReferenceId,
                      effectiveRate,
                      fishApiKey,
                      { temperature: host.fishTemperature, topP: host.fishTopP }
                    );
              await fs.writeFile(rawMp3Path, audioBuf);
              await decodeToWav(rawMp3Path, wavPath);
              cacheMisses += 1;

              if (useCache) {
                const tmpCachePath = `${cachedWavPath}.${process.pid}.${chunkTag}.tmp`;
                await fs.copyFile(wavPath, tmpCachePath);
                await fs.rename(tmpCachePath, cachedWavPath);
              }
            }
          } else {
            continue;
          }

          const dur = await probeDurationSeconds(wavPath);
          wavPaths.push(wavPath);
          speechDurationSec += dur;
        }

        let gapWavPath: string | null = null;
        let gapDurationSec = 0;
        if (seg.turnGapMs > 0 && idx < totalSegments - 1) {
          gapWavPath = path.join(tempDir, `${segPrefix}-gap.wav`);
          await createSilenceWav(seg.turnGapMs, gapWavPath);
          gapDurationSec = await probeDurationSeconds(gapWavPath);
        }

        completedCount += 1;
        const msg = `[${provider}] Prepared ${completedCount}/${totalSegments} (${seg.id}, ${host.name})`;
        onProgress?.(msg);

        return {
          segmentId: seg.id,
          hostId: seg.hostId,
          wavPaths,
          speechDurationSec,
          gapWavPath,
          gapDurationSec,
        };
      }
    );

    onProgress?.(
      `[${provider}] Chunk cache summary: ${cacheHits} hit(s), ${cacheMisses} synthesized${useCache ? '' : ' (cache disabled)'}`
    );

    const allWavPaths: string[] = [];
    const timings: SegmentTiming[] = [];
    let cursorSec = 0;

    // 0.35s clean lead-in silence
    const leadInWav = path.join(tempDir, '000-leadin.wav');
    await createSilenceWav(350, leadInWav);
    allWavPaths.push(leadInWav);
    cursorSec += await probeDurationSeconds(leadInWav);

    for (const artifact of segmentArtifacts) {
      const segStartSec = cursorSec;
      const segEndSec = segStartSec + artifact.speechDurationSec;
      allWavPaths.push(...artifact.wavPaths);
      cursorSec = segEndSec;

      timings.push({
        segmentId: artifact.segmentId,
        hostId: artifact.hostId,
        startSec: Number(segStartSec.toFixed(2)),
        endSec: Number(segEndSec.toFixed(2)),
        durationSec: Number(artifact.speechDurationSec.toFixed(2)),
      });

      if (artifact.gapWavPath) {
        allWavPaths.push(artifact.gapWavPath);
        cursorSec += artifact.gapDurationSec;
      }
    }

    // 0.6s clean tail silence
    const tailWav = path.join(tempDir, '999-tail.wav');
    await createSilenceWav(600, tailWav);
    allWavPaths.push(tailWav);

    const outFilenames = getTrackFilenames(provider);
    const outMp3Path = path.join(podcastDir, outFilenames.mp3);
    const outTimingsPath = path.join(podcastDir, outFilenames.timings);

    const stitchMsg = `[${provider}] Stitching & loudnorm normalizing -> artifacts/${episode.bookSlug}/podcast/${outFilenames.mp3}`;
    onProgress?.(stitchMsg);
    await concatWavListToMp3(allWavPaths, outMp3Path);

    const finalDuration = Number((await probeDurationSeconds(outMp3Path)).toFixed(2));
    const stat = await fs.stat(outMp3Path);
    const generatedAt = new Date().toISOString();
    const modelName =
      provider === 'edge'
        ? `Edge TTS (${episode.hosts.A.edgeVoice} + ${episode.hosts.B.edgeVoice})`
        : `Fish Audio s2.1-pro-free (${episode.hosts.A.fishVoiceTitle} × ${episode.hosts.B.fishVoiceTitle})`;

    const timingsPayload: TimingsFilePayload = {
      bookSlug: episode.bookSlug,
      provider,
      modelName,
      generatedAt,
      durationSec: finalDuration,
      timings,
    };
    await fs.writeFile(outTimingsPath, JSON.stringify(timingsPayload, null, 2), 'utf8');

    return {
      provider,
      label: provider === 'edge' ? 'Edge TTS' : 'Fish Audio s2.1-pro-free',
      modelName,
      available: true,
      audioUrl: `/${episode.bookSlug}/podcast/${outFilenames.mp3}`,
      durationSec: finalDuration,
      fileSizeBytes: stat.size,
      timings,
      generatedAt,
    };
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

async function readTrackState(
  episode: PodcastEpisode,
  provider: PodcastTtsProvider
): Promise<ProviderTrackState> {
  const podcastDir = getBookPodcastDir(episode.bookSlug);
  const filenames = getTrackFilenames(provider);
  const mp3Path = path.join(podcastDir, filenames.mp3);
  const timingsPath = path.join(podcastDir, filenames.timings);
  const label = provider === 'edge' ? 'Edge TTS' : 'Fish Audio s2.1-pro-free';
  const defaultModelName =
    provider === 'edge'
      ? `Edge TTS (${episode.hosts.A.edgeVoice} + ${episode.hosts.B.edgeVoice})`
      : `Fish Audio s2.1-pro-free (${episode.hosts.A.fishVoiceTitle} × ${episode.hosts.B.fishVoiceTitle})`;

  try {
    const stat = await fs.stat(mp3Path);
    let timingsPayload: TimingsFilePayload | null = null;
    try {
      const raw = await fs.readFile(timingsPath, 'utf8');
      timingsPayload = JSON.parse(raw) as TimingsFilePayload;
    } catch {
      timingsPayload = null;
    }

    return {
      provider,
      label,
      modelName: timingsPayload?.modelName ?? defaultModelName,
      available: true,
      audioUrl: `/${episode.bookSlug}/podcast/${filenames.mp3}`,
      durationSec: timingsPayload?.durationSec ?? null,
      fileSizeBytes: stat.size,
      timings: timingsPayload?.timings ?? [],
      generatedAt: timingsPayload?.generatedAt ?? stat.mtime.toISOString(),
    };
  } catch {
    return {
      provider,
      label,
      modelName: defaultModelName,
      available: false,
      audioUrl: null,
      durationSec: null,
      fileSizeBytes: null,
      timings: [],
      generatedAt: null,
    };
  }
}

export async function getPodcastAudioStatus(
  bookSlug: string = AMUSING_FULL_PODCAST.bookSlug
): Promise<PodcastStatusResponse> {
  const episode = getPodcastEpisodeByBookSlug(bookSlug) ?? AMUSING_FULL_PODCAST;
  const [edge, fish] = await Promise.all([
    readTrackState(episode, 'edge'),
    readTrackState(episode, 'fish'),
  ]);
  return {
    bookSlug: episode.bookSlug,
    edge,
    fish,
  };
}
