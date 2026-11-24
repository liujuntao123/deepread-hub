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

const FONT_FILES = [
  {
    name: 'NotoSansCJKsc-Medium.otf',
    url: 'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Medium.otf',
  },
  {
    name: 'NotoSansCJKsc-Bold.otf',
    url: 'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Bold.otf',
  },
  {
    name: 'NotoSerifCJKsc-Bold.otf',
    url: 'https://raw.githubusercontent.com/notofonts/noto-cjk/main/Serif/OTF/SimplifiedChinese/NotoSerifCJKsc-Bold.otf',
  },
];

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
 * Splits a spoken segment into crisp single-line captions (12-24 chars) aligned proportionally
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
    .split(/(?<=[。！？；：，、])|(?<=——)/)
    .map((s) => s.trim())
    .filter(Boolean);

  const merged: string[] = [];
  let buf = '';
  for (const clause of rawClauses) {
    if (!buf) {
      buf = clause;
    } else if (buf.length + clause.length <= 22) {
      buf += clause;
    } else {
      merged.push(buf);
      buf = clause;
    }
  }
  if (buf) merged.push(buf);

  const finalChunks: string[] = [];
  for (const item of merged) {
    if (item.length <= 25) {
      finalChunks.push(item);
    } else {
      // Split evenly into balanced pieces <= 24 chars
      const parts = Math.ceil(item.length / 22);
      const step = Math.ceil(item.length / parts);
      for (let i = 0; i < item.length; i += step) {
        finalChunks.push(item.slice(i, i + step));
      }
    }
  }

  const cleanedChunks = finalChunks
    .map((c) => c.replace(/[，。；、：—]+$/g, '').replace(/^—+/g, '').trim())
    .filter(Boolean);

  if (cleanedChunks.length === 0) return [];

  const totalChars = cleanedChunks.reduce((acc, s) => acc + Math.max(1, s.length), 0);
  const span = Math.max(0.4, endSec - startSec);
  let cursor = startSec;

  return cleanedChunks.map((text, idx) => {
    const share = (Math.max(1, text.length) / totalChars) * span;
    const cueStart = cursor;
    const cueEnd = idx === cleanedChunks.length - 1 ? endSec : cursor + share;
    cursor = cueEnd;
    return {
      id: `${segmentId}-sub-${idx + 1}`,
      actId,
      hostId,
      startSec: Number(cueStart.toFixed(3)),
      endSec: Number(cueEnd.toFixed(3)),
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

async function ensureFontsCached(fontsDir: string): Promise<void> {
  await fs.mkdir(fontsDir, { recursive: true });
  for (const font of FONT_FILES) {
    const target = path.join(fontsDir, font.name);
    if (await fileExistsNonEmpty(target, 100_000)) continue;
    console.log(`[fonts] Downloading ${font.name} -> .cache/fonts/...`);
    const res = await fetch(font.url, { signal: AbortSignal.timeout(120_000) });
    if (!res.ok) {
      throw new Error(`下载中文字体失败 (${res.status}): ${font.url}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(target, buf);
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

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.mp3') return 'audio/mpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.otf') return 'font/otf';
  if (ext === '.ttf') return 'font/ttf';
  if (ext === '.json') return 'application/json';
  return 'application/octet-stream';
}

async function startAssetServer(
  rootDir: string,
  fontsDir: string
): Promise<{ url: string; close: () => Promise<void> }> {
  const server = http.createServer(async (req, res) => {
    try {
      const reqPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
      let fullPath: string;
      if (reqPath.startsWith('/__fonts/')) {
        const fontName = path.basename(reqPath);
        fullPath = path.join(fontsDir, fontName);
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
        'Access-Control-Allow-Origin': '*',
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

function formatAssTime(sec: number): string {
  const safe = Math.max(0, sec);
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = Math.floor(safe % 60);
  const cs = Math.min(99, Math.round((safe - Math.floor(safe)) * 100));
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
}

function escapeAssText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\n/g, '\\N');
}

function escapeFfmpegFilterPath(p: string): string {
  return p.replace(/\\/g, '/').replace(/:/g, '\\:').replace(/'/g, "\\'");
}

function estimateCaptionPixelWidth(text: string, fontSize: number, letterSpacing: number): number {
  let width = 0;
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    const isNarrow = code < 0x2e80;
    width += (isNarrow ? fontSize * 0.56 : fontSize * 1.02) + letterSpacing;
  }
  return width;
}

function buildRoundedRectAssPath(w: number, h: number, r: number): string {
  const rad = Math.min(r, Math.floor(w / 2), Math.floor(h / 2));
  return [
    `m ${rad} 0`,
    `l ${w - rad} 0`,
    `b ${w} 0 ${w} 0 ${w} ${rad}`,
    `l ${w} ${h - rad}`,
    `b ${w} ${h} ${w} ${h} ${w - rad} ${h}`,
    `l ${rad} ${h}`,
    `b 0 ${h} 0 ${h} 0 ${h - rad}`,
    `l 0 ${rad}`,
    `b 0 0 0 0 ${rad} 0`,
  ].join(' ');
}

/**
 * Generates a studio-styled ASS subtitle file for a single slide window [slideStartSec, slideEndSec],
 * drawing a crisp rounded dark-ink frosted pill (Layer 0) behind Noto Sans CJK SC text (Layer 1).
 * No speaker badges, invisible during silence gaps.
 */
function buildSlideAssContent(
  cues: SubtitleCue[],
  slideStartSec: number,
  slideEndSec: number,
  width: number,
  height: number
): string {
  const scale = width / 1920;
  const fontSize = Math.round(36 * scale);
  const letterSpacing = Number((1.4 * scale).toFixed(1));
  const pillH = Math.round(62 * scale);
  const padX = Math.round(64 * scale);
  const radius = Math.round(13 * scale);
  const centerY = Math.round(height - 96 * scale);
  const pillY = Math.round(centerY - pillH / 2);
  const centerX = Math.round(width / 2);

  const lines: string[] = [
    '[Script Info]',
    'ScriptType: v4.00+',
    `PlayResX: ${width}`,
    `PlayResY: ${height}`,
    'ScaledBorderAndShadow: yes',
    'WrapStyle: 2',
    '',
    '[V4+ Styles]',
    'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding',
    `Style: Caption,Noto Sans CJK SC Medium,${fontSize},&H00F9FAFA,&H00F9FAFA,&H00000000,&H00000000,0,0,0,0,100,100,${letterSpacing},0,1,0,0,5,60,60,30,1`,
    `Style: Pill,Noto Sans CJK SC Medium,${fontSize},&H28151618,&H28151618,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,0,0,7,0,0,0,1`,
    '',
    '[Events]',
    'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text',
  ];

  const slideDuration = Math.max(0.1, slideEndSec - slideStartSec);

  for (const cue of cues) {
    if (cue.endSec <= slideStartSec || cue.startSec >= slideEndSec) continue;
    const localStart = Math.max(0, cue.startSec - slideStartSec);
    const localEnd = Math.min(slideDuration, cue.endSec - slideStartSec);
    if (localEnd - localStart < 0.08) continue;

    const startStr = formatAssTime(localStart);
    const endStr = formatAssTime(localEnd);
    const textW = estimateCaptionPixelWidth(cue.text, fontSize, letterSpacing);
    const pillW = Math.min(width - Math.round(120 * scale), Math.max(Math.round(140 * scale), Math.round(textW + padX)));
    const pillX = Math.round((width - pillW) / 2);
    const pathStr = buildRoundedRectAssPath(pillW, pillH, radius);

    // Layer 0: Rounded dark-ink frosted pill
    lines.push(
      `Dialogue: 0,${startStr},${endStr},Pill,,0,0,0,,{\\an7\\pos(${pillX},${pillY})\\bord0\\shad0\\c&H151618&\\alpha&H28&\\fad(70,70)\\p1}${pathStr}`
    );
    // Layer 1: Warm-white crisp caption text
    lines.push(
      `Dialogue: 1,${startStr},${endStr},Caption,,0,0,0,,{\\an5\\pos(${centerX},${centerY})\\bord0\\shad0\\c&HF9FAFA&\\fad(70,70)}${escapeAssText(cue.text)}`
    );
  }

  return `${lines.join('\n')}\n`;
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
  const preset = readArg(args, '--preset', 'hd'); // 'hd' (1920x1080 24fps) | 'fast' (1280x720 20fps)
  const useCache = !args.includes('--no-cache');

  const defaultFps = preset === 'fast' ? 20 : 24;
  const defaultWidth = preset === 'fast' ? 1280 : 1920;
  const defaultHeight = preset === 'fast' ? 720 : 1080;
  const renderFps = Number.parseInt(readArg(args, '--fps', String(defaultFps)), 10);
  const outWidth = Number.parseInt(readArg(args, '--width', String(defaultWidth)), 10);
  const outHeight = Number.parseInt(readArg(args, '--height', String(defaultHeight)), 10);
  const crfArg = Number.parseInt(readArg(args, '--crf', '22'), 10);
  const fadeSecDefault = Number.parseFloat(readArg(args, '--fade', '0.35'));
  const clipConcurrency = Math.max(
    1,
    Math.min(6, Number.parseInt(readArg(args, '--workers', '4'), 10) || 4)
  );

  const bookArtifactsDir = path.resolve(process.cwd(), 'artifacts', bookSlug);
  const storyboardPath = path.join(bookArtifactsDir, 'video', 'storyboard.json');
  const outputPath = path.join(bookArtifactsDir, 'video', 'final.mp4');
  const cacheRoot = path.resolve(process.cwd(), '.cache', 'video', bookSlug);
  const slidesCacheDir = path.join(cacheRoot, 'slides');
  const clipsCacheDir = path.join(cacheRoot, 'slide-clips');
  const fontsDir = path.resolve(process.cwd(), '.cache', 'fonts');

  await fs.mkdir(slidesCacheDir, { recursive: true });
  await fs.mkdir(clipsCacheDir, { recursive: true });
  await ensureFontsCached(fontsDir);

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

  // Validate all referenced illustration frames exist before starting
  const frameMtimes = new Map<string, number>();
  for (const scene of storyboard.scenes) {
    if (!scene.imageFile) continue;
    const framePath = path.join(bookArtifactsDir, 'video', 'frames', scene.imageFile);
    const stat = await fs.stat(framePath).catch(() => {
      throw new Error(
        `缺少分镜插画文件：${framePath}，请先运行 npm run video:image -- --book ${bookSlug}`
      );
    });
    frameMtimes.set(scene.imageFile, Math.round(stat.mtimeMs));
  }

  const subtitles: SubtitleCue[] = [];
  for (const seg of episode.segments) {
    const t = timingsMap.get(seg.id);
    if (!t) continue;
    const plain = toPlainReadableText(seg.scriptText);
    subtitles.push(...buildSubtitleCues(seg.id, seg.actId, seg.hostId, plain, t.startSec, t.endSec));
  }

  const overallStart = Date.now();
  console.log(
    `[render-v2] Zero-Redundant-Frame PPT Engine | ${outWidth}x${outHeight} @ ${renderFps}fps | ${storyboard.scenes.length} slides | ${subtitles.length} captions | fade=${fadeSecDefault}s`
  );

  // ==================== STAGE 1: Render ONLY N Base PPT Slides via Remotion renderStill ====================
  const remotionDir = path.resolve(process.cwd(), 'pipelines', 'video', 'remotion');
  const remotionRequire = createRequire(path.join(remotionDir, 'package.json'));
  const { bundle } = remotionRequire('@remotion/bundler') as {
    bundle: (opts: { entryPoint: string }) => Promise<string>;
  };
  const { openBrowser, selectComposition, renderStill } = remotionRequire('@remotion/renderer') as {
    openBrowser: (
      browserType: 'chrome',
      opts?: Record<string, unknown>
    ) => Promise<{ close: (opts?: Record<string, unknown>) => Promise<void> }>;
    selectComposition: (opts: Record<string, unknown>) => Promise<Record<string, unknown>>;
    renderStill: (opts: Record<string, unknown>) => Promise<void>;
  };

  const slidePngPaths: string[] = [];
  const slidesToRender: Array<{ index: number; outPath: string }> = [];

  for (let i = 0; i < storyboard.scenes.length; i += 1) {
    const scene = storyboard.scenes[i];
    const slideHash = crypto
      .createHash('sha256')
      .update(
        JSON.stringify({
          v: 6,
          scene,
          index: i,
          total: storyboard.scenes.length,
          outWidth,
          outHeight,
          imageMtime: scene.imageFile ? frameMtimes.get(scene.imageFile) ?? 0 : 0,
        })
      )
      .digest('hex')
      .slice(0, 12);

    const slidePath = path.join(slidesCacheDir, `${scene.sceneId}-${slideHash}.png`);
    slidePngPaths.push(slidePath);
    if (!useCache || !(await fileExistsNonEmpty(slidePath))) {
      slidesToRender.push({ index: i, outPath: slidePath });
    }
  }

  if (slidesToRender.length > 0) {
    const stillStart = Date.now();
    const browserExecutable = await detectBrowserExecutable();
    console.log(
      `[stage-1] Rendering ${slidesToRender.length}/${storyboard.scenes.length} unique base PPT slides (cache hits: ${storyboard.scenes.length - slidesToRender.length})...`
    );

    const serveUrl = await bundle({
      entryPoint: path.join(remotionDir, 'src', 'index.ts'),
    });
    const assetServer = await startAssetServer(bookArtifactsDir, fontsDir);
    const browser = await openBrowser('chrome', {
      ...(browserExecutable ? { browserExecutable } : {}),
    });

    try {
      const baseProps = {
        bookTitle: storyboard.bookTitle,
        episodeTitle: storyboard.episodeTitle,
        audioUrl: '',
        assetBaseUrl: assetServer.url,
        fps: renderFps,
        width: storyboard.width,
        height: storyboard.height,
        totalDurationSec: storyboard.totalDurationSec,
        acts: episode.acts.map((a) => ({
          id: a.id,
          indexLabel: a.indexLabel,
          title: a.title,
        })),
        scenes: storyboard.scenes,
        subtitles: [],
        hideSubtitle: true,
      };

      const composition = await selectComposition({
        serveUrl,
        id: 'PodcastVideo',
        inputProps: baseProps,
        puppeteerInstance: browser,
      });

      const scale = outWidth / storyboard.width;
      for (let k = 0; k < slidesToRender.length; k += 1) {
        const target = slidesToRender[k];
        const tmpPng = `${target.outPath}.tmp.png`;
        const slideProps = {
          ...baseProps,
          forceSceneIndex: target.index,
        };
        await renderStill({
          composition: {
            ...composition,
            props: slideProps,
          },
          serveUrl,
          output: tmpPng,
          frame: 30,
          scale,
          imageFormat: 'png',
          inputProps: slideProps,
          puppeteerInstance: browser,
        });
        await fs.rename(tmpPng, target.outPath);
        if ((k + 1) % 5 === 0 || k === slidesToRender.length - 1) {
          console.log(
            `  [slides] ${k + 1}/${slidesToRender.length} rendered (${Math.round((Date.now() - stillStart) / 1000)}s)`
          );
        }
      }
    } finally {
      await browser.close({ silent: true });
      await assetServer.close();
    }
  } else {
    console.log(`[stage-1] All ${storyboard.scenes.length} base PPT slides loaded from cache.`);
  }

  // ==================== STAGE 2: Parallel Native FFmpeg Slide Clips + Crossfade + ASS Subtitles ====================
  const totalFrames = Math.ceil(storyboard.totalDurationSec * renderFps);
  const clipPlans = storyboard.scenes.map((scene, idx) => {
    const startFrame = idx === 0 ? 0 : Math.round(scene.startSec * renderFps);
    const endFrame =
      idx === storyboard.scenes.length - 1
        ? totalFrames
        : Math.round(scene.endSec * renderFps);
    const frameCount = Math.max(renderFps, endFrame - startFrame);
    return {
      idx,
      scene,
      startFrame,
      endFrame,
      frameCount,
      startSec: startFrame / renderFps,
      endSec: (startFrame + frameCount) / renderFps,
      durationSec: frameCount / renderFps,
    };
  });

  const clipOutputPaths: string[] = new Array(clipPlans.length);
  const stage2Start = Date.now();
  let cursor = 0;
  let completedClips = 0;

  console.log(
    `[stage-2] Synthesizing ${clipPlans.length} slide clips with crossfade + styled captions (${clipConcurrency} parallel FFmpeg workers)...`
  );

  const workers = Array.from({ length: Math.min(clipConcurrency, clipPlans.length) }, async () => {
    while (true) {
      const idx = cursor;
      cursor += 1;
      if (idx >= clipPlans.length) break;

      const plan = clipPlans[idx];
      const currSlidePng = slidePngPaths[idx];
      const prevSlidePng = idx > 0 ? slidePngPaths[idx - 1] : null;
      const assContent = buildSlideAssContent(
        subtitles,
        plan.startSec,
        plan.endSec,
        outWidth,
        outHeight
      );

      const clipHash = crypto
        .createHash('sha256')
        .update(
          JSON.stringify({
            v: 4,
            outWidth,
            outHeight,
            renderFps,
            crfArg,
            fadeSecDefault,
            frameCount: plan.frameCount,
            currSlide: path.basename(currSlidePng),
            prevSlide: prevSlidePng ? path.basename(prevSlidePng) : null,
            assContent,
          })
        )
        .digest('hex')
        .slice(0, 14);

      const clipPath = path.join(clipsCacheDir, `${plan.scene.sceneId}-${clipHash}.mp4`);
      clipOutputPaths[idx] = clipPath;

      if (useCache && (await fileExistsNonEmpty(clipPath))) {
        completedClips += 1;
        continue;
      }

      const assPath = path.join(clipsCacheDir, `${plan.scene.sceneId}-${clipHash}.ass`);
      const tmpClipPath = `${clipPath}.tmp.mp4`;
      await fs.writeFile(assPath, assContent, 'utf8');

      const escapedAss = escapeFfmpegFilterPath(assPath);
      const escapedFonts = escapeFfmpegFilterPath(fontsDir);
      const fadeSec = prevSlidePng ? Math.min(fadeSecDefault, plan.durationSec * 0.4) : 0;

      const ffArgs: string[] = ['-y', '-threads', '4'];
      if (prevSlidePng && fadeSec >= 0.08) {
        ffArgs.push(
          '-loop',
          '1',
          '-framerate',
          String(renderFps),
          '-t',
          fadeSec.toFixed(4),
          '-i',
          prevSlidePng,
          '-loop',
          '1',
          '-framerate',
          String(renderFps),
          '-t',
          (plan.durationSec + 0.1).toFixed(4),
          '-i',
          currSlidePng,
          '-filter_complex',
          `[0:v]fps=${renderFps},scale=${outWidth}:${outHeight},format=yuv420p,setsar=1[v0];[1:v]fps=${renderFps},scale=${outWidth}:${outHeight},format=yuv420p,setsar=1[v1];[v0][v1]xfade=transition=fade:duration=${fadeSec.toFixed(4)}:offset=0,ass='${escapedAss}':fontsdir='${escapedFonts}'[vout]`,
          '-map',
          '[vout]'
        );
      } else {
        ffArgs.push(
          '-loop',
          '1',
          '-framerate',
          String(renderFps),
          '-t',
          (plan.durationSec + 0.1).toFixed(4),
          '-i',
          currSlidePng,
          '-vf',
          `fps=${renderFps},scale=${outWidth}:${outHeight},format=yuv420p,setsar=1,ass='${escapedAss}':fontsdir='${escapedFonts}'`
        );
      }

      ffArgs.push(
        '-frames:v',
        String(plan.frameCount),
        '-c:v',
        'libx264',
        '-preset',
        'veryfast',
        '-tune',
        'stillimage',
        '-crf',
        String(crfArg),
        '-g',
        String(renderFps * 2),
        '-pix_fmt',
        'yuv420p',
        '-an',
        tmpClipPath
      );

      try {
        await execFileAsync(FFMPEG_BIN, ffArgs, { maxBuffer: 16 * 1024 * 1024 });
        await fs.rename(tmpClipPath, clipPath);
      } finally {
        await fs.rm(tmpClipPath, { force: true });
      }

      completedClips += 1;
      if (completedClips % 5 === 0 || completedClips === clipPlans.length) {
        console.log(
          `  [clips] ${completedClips}/${clipPlans.length} done (${Math.round((Date.now() - stage2Start) / 1000)}s)`
        );
      }
    }
  });

  await Promise.all(workers);

  // ==================== STAGE 3: Lossless Concat + Audio Mux ====================
  console.log(
    `[stage-3] Concatenating ${clipOutputPaths.length} slide clips + muxing ${storyboard.audioProvider}.mp3 -> artifacts/${bookSlug}/video/final.mp4`
  );
  await concatVideoChunksWithAudio(clipOutputPaths, audioFilePath, outputPath);

  const stat = await fs.stat(outputPath);
  const { stdout: probeOut } = await execFileAsync(FFPROBE_BIN, [
    '-v',
    'error',
    '-show_entries',
    'format=duration',
    '-of',
    'default=noprint_wrappers=1:nokey=1',
    outputPath,
  ]);
  const finalDur = Number.parseFloat(probeOut.trim()) || storyboard.totalDurationSec;

  console.log(
    `[done] artifacts/${bookSlug}/video/final.mp4 | ${outWidth}x${outHeight} @ ${renderFps}fps | duration=${finalDur.toFixed(1)}s | size=${(stat.size / (1024 * 1024)).toFixed(1)} MB | elapsed=${Math.round((Date.now() - overallStart) / 1000)}s`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
