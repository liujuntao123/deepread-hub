import { execFile } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import { promisify } from 'node:util';
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import { getPodcastEpisodeByBookSlug } from '../../content/podcast/registry.ts';
import { toPlainReadableText } from '../../content/podcast/script.ts';
import type { SegmentTiming } from '../../content/podcast/types.ts';
import type { VideoStoryboard } from './types.ts';

const execFileAsync = promisify(execFile);
const FFMPEG_BIN = process.env.FFMPEG_PATH?.trim() || ffmpegStatic || 'ffmpeg';
const FFPROBE_BIN = process.env.FFPROBE_PATH?.trim() || ffprobeStatic?.path || 'ffprobe';

function readArg(args: string[], flag: string, fallback: string): string {
  const idx = args.indexOf(flag);
  if (idx >= 0 && args[idx + 1]) {
    return args[idx + 1];
  }
  return fallback;
}

interface SubtitleCue {
  id: string;
  actId: string;
  hostId: 'A' | 'B';
  startSec: number;
  endSec: number;
  text: string;
}

/**
 * Splits a spoken segment into crisp 18-32 char subtitle cues aligned proportionally
 * within the segment's exact [startSec, endSec] audio window.
 */
function buildSubtitleCues(
  segmentId: string,
  actId: string,
  hostId: 'A' | 'B',
  plainText: string,
  startSec: number,
  endSec: number
): SubtitleCue[] {
  const rawClauses = plainText
    .split(/(?<=[。！？；：，、——])/)
    .map((s) => s.trim())
    .filter(Boolean);

  const merged: string[] = [];
  let buf = '';
  for (const clause of rawClauses) {
    if (!buf) {
      buf = clause;
    } else if (buf.length + clause.length <= 32) {
      buf += clause;
    } else {
      merged.push(buf);
      buf = clause;
    }
  }
  if (buf) merged.push(buf);

  const finalChunks: string[] = [];
  for (const item of merged) {
    if (item.length <= 36) {
      finalChunks.push(item);
    } else {
      for (let i = 0; i < item.length; i += 30) {
        finalChunks.push(item.slice(i, i + 30));
      }
    }
  }

  const totalChars = finalChunks.reduce((acc, s) => acc + Math.max(1, s.length), 0);
  const span = Math.max(0.5, endSec - startSec);
  let cursor = startSec;

  return finalChunks.map((text, idx) => {
    const share = (Math.max(1, text.length) / totalChars) * span;
    const cueStart = cursor;
    const cueEnd = idx === finalChunks.length - 1 ? endSec : cursor + share;
    cursor = cueEnd;
    return {
      id: `${segmentId}-sub-${idx + 1}`,
      actId,
      hostId,
      startSec: Number(cueStart.toFixed(2)),
      endSec: Number(cueEnd.toFixed(2)),
      text,
    };
  });
}

async function fileExistsNonEmpty(p: string, minBytes = 1024): Promise<boolean> {
  try {
    const stat = await fs.stat(p);
    return stat.size > minBytes;
  } catch {
    return false;
  }
}

async function detectBrowserExecutable(): Promise<string | null> {
  const candidates = [
    process.env.REMOTION_BROWSER_EXECUTABLE,
    '/home/admin1/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',
    '/home/admin1/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter((x): x is string => Boolean(x));

  for (const p of candidates) {
    try {
      await fs.access(p);
      return p;
    } catch {
      // try next
    }
  }
  return null;
}

/**
 * Pre-resizes multi-megabyte raw PNG frames into lightweight JPEGs inside `.cache/video/<slug>/frames-opt/`
 * so Chromium decodes illustrations far faster during headless frame rendering.
 */
async function prepareOptimizedFrames(
  bookArtifactsDir: string,
  cacheRoot: string,
  storyboard: VideoStoryboard,
  maxWidth: number
): Promise<Map<string, string>> {
  const optDir = path.join(cacheRoot, `frames-opt-${maxWidth}`);
  await fs.mkdir(optDir, { recursive: true });
  const map = new Map<string, string>();

  for (const scene of storyboard.scenes) {
    if (!scene.imageFile) continue;
    const srcPath = path.join(bookArtifactsDir, 'video', 'frames', scene.imageFile);
    await fs.access(srcPath).catch(() => {
      throw new Error(
        `缺少分镜插画文件：${srcPath}，请先运行 npm run video:image -- --book ${storyboard.bookSlug}`
      );
    });

    const optName = `${path.parse(scene.imageFile).name}.jpg`;
    const optPath = path.join(optDir, optName);

    const srcStat = await fs.stat(srcPath);
    let needConvert = true;
    try {
      const optStat = await fs.stat(optPath);
      if (optStat.size > 1024 && optStat.mtimeMs >= srcStat.mtimeMs) {
        needConvert = false;
      }
    } catch {
      needConvert = true;
    }

    if (needConvert) {
      await execFileAsync(FFMPEG_BIN, [
        '-y',
        '-i',
        srcPath,
        '-vf',
        `scale='min(${maxWidth},iw)':-2`,
        '-q:v',
        '3',
        optPath,
      ]);
    }
    map.set(scene.imageFile, optPath);
  }

  return map;
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.mp3') return 'audio/mpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.json') return 'application/json';
  return 'application/octet-stream';
}

async function startAssetServer(
  rootDir: string,
  optimizedFrames: Map<string, string>
): Promise<{ url: string; close: () => Promise<void> }> {
  const server = http.createServer(async (req, res) => {
    try {
      const reqPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
      const frameMatch = /^\/video\/frames\/([^/]+)$/.exec(reqPath);
      let fullPath: string;
      if (frameMatch && optimizedFrames.has(frameMatch[1])) {
        fullPath = optimizedFrames.get(frameMatch[1])!;
      } else {
        const safePath = path.normalize(reqPath).replace(/^(\.\.(\/|\\|$))+/, '');
        fullPath = path.join(rootDir, safePath);
        if (!fullPath.startsWith(rootDir)) {
          res.writeHead(403).end('Forbidden');
          return;
        }
      }

      const stat = await fs.stat(fullPath);
      const mime = getMimeType(fullPath);
      const data = await fs.readFile(fullPath);
      res.writeHead(200, {
        'Content-Length': stat.size,
        'Cache-Control': 'public, max-age=3600',
        'Content-Type': mime,
      });
      res.end(data);
    } catch {
      res.writeHead(404).end('Not Found');
    }
  });

  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const addr = server.address();
  if (!addr || typeof addr === 'string') {
    throw new Error('Failed to bind local asset server');
  }
  return {
    url: `http://127.0.0.1:${addr.port}`,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
}

interface ActChunkPlan {
  actId: string;
  indexLabel: string;
  startFrame: number;
  endFrame: number;
}

function buildActFrameChunks(
  storyboard: VideoStoryboard,
  actIds: Array<{ id: string; indexLabel: string }>,
  fps: number,
  totalFrames: number
): ActChunkPlan[] {
  const chunks: ActChunkPlan[] = [];
  let cursorFrame = 0;

  for (let i = 0; i < actIds.length; i += 1) {
    const act = actIds[i];
    const actScenes = storyboard.scenes.filter((s) => s.actId === act.id);
    const isLast = i === actIds.length - 1;
    let endFrame = totalFrames - 1;

    if (!isLast && actScenes.length > 0) {
      const actEndSec = actScenes[actScenes.length - 1].endSec;
      endFrame = Math.min(totalFrames - 1, Math.max(cursorFrame, Math.round(actEndSec * fps) - 1));
    }

    if (cursorFrame <= endFrame) {
      chunks.push({
        actId: act.id,
        indexLabel: act.indexLabel,
        startFrame: cursorFrame,
        endFrame,
      });
      cursorFrame = endFrame + 1;
    }
  }

  return chunks;
}

async function concatVideoChunksWithAudio(
  chunkPaths: string[],
  audioPath: string,
  outMp4Path: string
): Promise<void> {
  const listFile = `${outMp4Path}.concat.txt`;
  const tmpOutPath = `${outMp4Path}.tmp.mp4`;
  const listContent = chunkPaths.map((f) => `file '${f.replace(/'/g, "'\\''")}'`).join('\n');
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
        '-i',
        audioPath,
        '-map',
        '0:v:0',
        '-map',
        '1:a:0',
        '-c:v',
        'copy',
        '-c:a',
        'aac',
        '-b:a',
        '128k',
        '-movflags',
        '+faststart',
        '-shortest',
        tmpOutPath,
      ],
      { maxBuffer: 16 * 1024 * 1024 }
    );
    await fs.rename(tmpOutPath, outMp4Path);
  } finally {
    await fs.rm(listFile, { force: true });
    await fs.rm(tmpOutPath, { force: true });
  }
}

async function main() {
  const args = process.argv.slice(2);
  const bookSlug = readArg(args, '--book', 'amusing-ourselves-to-death');
  const preset = readArg(args, '--preset', 'fast'); // 'fast' (720p 20fps) | 'hd' (1080p 24fps)
  const useCache = !args.includes('--no-cache');

  const defaultFps = preset === 'hd' ? 24 : 20;
  const defaultScale = preset === 'hd' ? 1 : 2 / 3; // exact 1280x720 from 1920x1080
  const renderFps = Number.parseInt(readArg(args, '--fps', String(defaultFps)), 10);
  const scaleArg = Number.parseFloat(readArg(args, '--scale', String(defaultScale)));
  const concurrencyArg = Number.parseInt(readArg(args, '--concurrency', '12'), 10);
  const crfArg = Number.parseInt(readArg(args, '--crf', '24'), 10);
  const jpegQuality = Number.parseInt(readArg(args, '--jpeg-quality', '88'), 10);

  const bookArtifactsDir = path.resolve(process.cwd(), 'artifacts', bookSlug);
  const storyboardPath = path.join(bookArtifactsDir, 'video', 'storyboard.json');
  const outputPath = path.join(bookArtifactsDir, 'video', 'final.mp4');
  const cacheRoot = path.resolve(process.cwd(), '.cache', 'video', bookSlug);
  const chunksCacheDir = path.join(cacheRoot, 'chunks');
  await fs.mkdir(chunksCacheDir, { recursive: true });

  const storyboard = JSON.parse(await fs.readFile(storyboardPath, 'utf8')) as VideoStoryboard;
  const episode = getPodcastEpisodeByBookSlug(bookSlug);
  if (!episode) {
    throw new Error(`未找到书目 ${bookSlug} 的播客演播稿。`);
  }

  const audioFilePath = path.join(
    bookArtifactsDir,
    'podcast',
    `${storyboard.audioProvider}.mp3`
  );
  const timingsPath = path.join(
    bookArtifactsDir,
    'podcast',
    `${storyboard.audioProvider}.timings.json`
  );
  await fs.access(audioFilePath);

  const timingsPayload = JSON.parse(await fs.readFile(timingsPath, 'utf8')) as {
    timings: SegmentTiming[];
  };
  const timingsMap = new Map(timingsPayload.timings.map((t) => [t.segmentId, t]));

  const targetFrameWidth = Math.round(storyboard.width * scaleArg);
  console.log(
    `[render] Optimizing source illustrations for ${targetFrameWidth}px width...`
  );
  const optimizedFrames = await prepareOptimizedFrames(
    bookArtifactsDir,
    cacheRoot,
    storyboard,
    Math.max(960, targetFrameWidth)
  );

  const subtitles: SubtitleCue[] = [];
  for (const seg of episode.segments) {
    const t = timingsMap.get(seg.id);
    if (!t) continue;
    const plain = toPlainReadableText(seg.scriptText);
    subtitles.push(...buildSubtitleCues(seg.id, seg.actId, seg.hostId, plain, t.startSec, t.endSec));
  }

  const remotionDir = path.resolve(process.cwd(), 'pipelines', 'video', 'remotion');
  const remotionRequire = createRequire(path.join(remotionDir, 'package.json'));
  const { bundle } = remotionRequire('@remotion/bundler') as {
    bundle: (opts: { entryPoint: string }) => Promise<string>;
  };
  const { selectComposition, renderMedia } = remotionRequire('@remotion/renderer') as {
    selectComposition: (opts: Record<string, unknown>) => Promise<Record<string, unknown>>;
    renderMedia: (opts: Record<string, unknown>) => Promise<void>;
  };

  const browserExecutable = await detectBrowserExecutable();
  console.log(
    `[render] Preset=${preset} (${Math.round(storyboard.width * scaleArg)}x${Math.round(storyboard.height * scaleArg)} @ ${renderFps}fps, jpeg=${jpegQuality}, x264=veryfast, concurrency=${concurrencyArg})`
  );
  console.log(`[render] Browser: ${browserExecutable ?? 'Remotion managed Chromium'}`);

  const serveUrl = await bundle({
    entryPoint: path.join(remotionDir, 'src', 'index.ts'),
  });

  const assetServer = await startAssetServer(bookArtifactsDir, optimizedFrames);
  const overallStart = Date.now();

  try {
    const inputProps = {
      bookTitle: storyboard.bookTitle,
      episodeTitle: storyboard.episodeTitle,
      // Audio is muxed cleanly once at the end via ffmpeg to guarantee zero seams across act chunks
      audioUrl: '',
      assetBaseUrl: assetServer.url,
      fps: renderFps,
      width: storyboard.width,
      height: storyboard.height,
      totalDurationSec: storyboard.totalDurationSec,
      hosts: {
        A: { name: episode.hosts.A.name, role: episode.hosts.A.role },
        B: { name: episode.hosts.B.name, role: episode.hosts.B.role },
      },
      acts: episode.acts.map((a) => ({
        id: a.id,
        indexLabel: a.indexLabel,
        title: a.title,
      })),
      scenes: storyboard.scenes,
      subtitles,
    };

    const composition = await selectComposition({
      serveUrl,
      id: 'PodcastVideo',
      inputProps,
      ...(browserExecutable ? { browserExecutable } : {}),
    });

    const totalFrames = Number(composition.durationInFrames ?? 0);
    const actChunks = buildActFrameChunks(
      storyboard,
      episode.acts.map((a) => ({ id: a.id, indexLabel: a.indexLabel })),
      renderFps,
      totalFrames
    );

    console.log(
      `[render] Segmented rendering across ${actChunks.length} acts (${totalFrames} total frames)...`
    );

    const chunkOutputPaths: string[] = [];
    for (let i = 0; i < actChunks.length; i += 1) {
      const chunk = actChunks[i];
      const actScenes = storyboard.scenes.filter((s) => s.actId === chunk.actId);
      const actSubs = subtitles.filter((s) => s.actId === chunk.actId);
      const chunkHash = crypto
        .createHash('sha256')
        .update(
          JSON.stringify({
            v: 2,
            renderFps,
            scaleArg,
            crfArg,
            jpegQuality,
            startFrame: chunk.startFrame,
            endFrame: chunk.endFrame,
            actScenes,
            actSubs,
          })
        )
        .digest('hex')
        .slice(0, 14);

      const chunkPath = path.join(chunksCacheDir, `${chunk.actId}-${chunkHash}.mp4`);
      chunkOutputPaths.push(chunkPath);

      if (useCache && (await fileExistsNonEmpty(chunkPath))) {
        console.log(
          `[cache-hit ${i + 1}/${actChunks.length}] ${chunk.indexLabel} (${chunk.endFrame - chunk.startFrame + 1} frames) -> ${path.basename(chunkPath)}`
        );
        continue;
      }

      const tmpChunkPath = `${chunkPath}.tmp.mp4`;
      const chunkStart = Date.now();
      let lastPct = -25;
      console.log(
        `[act ${i + 1}/${actChunks.length}] Rendering ${chunk.indexLabel} (frames ${chunk.startFrame}..${chunk.endFrame}, ${chunk.endFrame - chunk.startFrame + 1} frames)...`
      );

      await renderMedia({
        composition,
        serveUrl,
        codec: 'h264',
        muted: true,
        imageFormat: 'jpeg',
        jpegQuality,
        x264Preset: 'veryfast',
        crf: crfArg,
        scale: scaleArg,
        frameRange: [chunk.startFrame, chunk.endFrame],
        outputLocation: tmpChunkPath,
        inputProps,
        concurrency: concurrencyArg,
        ...(browserExecutable ? { browserExecutable } : {}),
        ...(FFMPEG_BIN ? { ffmpegExecutable: FFMPEG_BIN } : {}),
        ...(FFPROBE_BIN ? { ffprobeExecutable: FFPROBE_BIN } : {}),
        onProgress: ({ progress }: { progress: number }) => {
          const pct = Math.floor(progress * 100);
          if (pct >= lastPct + 25) {
            lastPct = pct;
            console.log(
              `  [${chunk.actId}] ${pct}% (${Math.round((Date.now() - chunkStart) / 1000)}s)`
            );
          }
        },
      });

      await fs.rename(tmpChunkPath, chunkPath);
      console.log(
        `[act-done ${i + 1}/${actChunks.length}] ${chunk.indexLabel} finished in ${Math.round((Date.now() - chunkStart) / 1000)}s`
      );
    }

    console.log(
      `[mux] Concatenating ${chunkOutputPaths.length} act clips + muxing ${storyboard.audioProvider}.mp3 -> artifacts/${bookSlug}/video/final.mp4`
    );
    await concatVideoChunksWithAudio(chunkOutputPaths, audioFilePath, outputPath);

    const stat = await fs.stat(outputPath);
    console.log(
      `[done] artifacts/${bookSlug}/video/final.mp4 (${(stat.size / (1024 * 1024)).toFixed(1)} MB) total=${Math.round((Date.now() - overallStart) / 1000)}s`
    );
  } finally {
    await assetServer.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
