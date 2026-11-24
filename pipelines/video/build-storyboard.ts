import fs from 'node:fs/promises';
import path from 'node:path';
import { getPodcastEpisodeByBookSlug } from '../../content/podcast/registry.ts';
import type { PodcastTtsProvider, SegmentTiming } from '../../content/podcast/types.ts';
import { estimateScriptDurationSeconds } from '../../content/podcast/script.ts';
import { VIDEO_PLANS_BY_BOOK } from './plans/index.ts';
import { DEFAULT_VIDEO_STYLE_BIBLE } from './styleBible.ts';
import type { VideoStoryboard, VideoStoryboardScene } from './types.ts';

function readArg(args: string[], flag: string, fallback: string): string {
  const idx = args.indexOf(flag);
  if (idx >= 0 && args[idx + 1]) {
    return args[idx + 1];
  }
  return fallback;
}

interface TimingsPayload {
  bookSlug: string;
  provider: PodcastTtsProvider;
  durationSec: number;
  timings: SegmentTiming[];
}

async function readExistingPromptHashes(storyboardPath: string): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  try {
    const raw = await fs.readFile(storyboardPath, 'utf8');
    const prev = JSON.parse(raw) as Partial<VideoStoryboard>;
    if (Array.isArray(prev.scenes)) {
      for (const s of prev.scenes) {
        if (s.sceneId && s.promptHash) {
          map.set(s.sceneId, s.promptHash);
        }
      }
    }
  } catch {
    // no previous storyboard
  }
  return map;
}

async function main() {
  const args = process.argv.slice(2);
  const bookSlug = readArg(args, '--book', 'amusing-ourselves-to-death');
  const providerRaw = readArg(args, '--provider', 'fish');
  const provider: PodcastTtsProvider = providerRaw === 'edge' ? 'edge' : 'fish';
  const allowEstimated = args.includes('--draft');

  const plan = VIDEO_PLANS_BY_BOOK[bookSlug];
  if (!plan) {
    throw new Error(`尚未为书目 ${bookSlug} 编写视频分镜计划（pipelines/video/plans/）。`);
  }

  const episode = getPodcastEpisodeByBookSlug(bookSlug);
  if (!episode) {
    throw new Error(`未找到书目 ${bookSlug} 的播客演播稿。`);
  }

  const artifactsRoot = path.resolve(process.cwd(), 'artifacts', bookSlug);
  const timingsPath = path.join(artifactsRoot, 'podcast', `${provider}.timings.json`);
  const videoDir = path.join(artifactsRoot, 'video');
  const storyboardPath = path.join(videoDir, 'storyboard.json');

  let timingsMap = new Map<string, SegmentTiming>();
  let totalDurationSec = 0;

  try {
    const raw = await fs.readFile(timingsPath, 'utf8');
    const payload = JSON.parse(raw) as TimingsPayload;
    totalDurationSec = payload.durationSec;
    for (const t of payload.timings) {
      timingsMap.set(t.segmentId, t);
    }
    console.log(
      `[storyboard] Loaded exact timings from artifacts/${bookSlug}/podcast/${provider}.timings.json (${totalDurationSec}s)`
    );
  } catch (err) {
    if (!allowEstimated) {
      throw new Error(
        `未找到精确时间戳文件 ${timingsPath}。请先生成 ${provider} 音轨，或传 --draft 使用估算时长生成草稿分镜。`
      );
    }
    // Build estimated timings for draft mode
    let cursor = 0.35;
    for (const seg of episode.segments) {
      const est = Math.max(4, estimateScriptDurationSeconds([seg]) - seg.turnGapMs / 1000);
      timingsMap.set(seg.id, {
        segmentId: seg.id,
        hostId: seg.hostId,
        startSec: Number(cursor.toFixed(2)),
        endSec: Number((cursor + est).toFixed(2)),
        durationSec: Number(est.toFixed(2)),
      });
      cursor += est + seg.turnGapMs / 1000;
    }
    totalDurationSec = Number((cursor + 0.6).toFixed(2));
    console.warn(
      `[storyboard] --draft mode: using estimated duration (${totalDurationSec}s); re-run after audio generation to lock exact frame timings.`
    );
    void err;
  }

  const prevHashes = await readExistingPromptHashes(storyboardPath);
  const scenes: VideoStoryboardScene[] = [];

  for (let i = 0; i < plan.scenes.length; i += 1) {
    const item = plan.scenes[i];
    const startTiming = timingsMap.get(item.startSegmentId);
    const endTiming = timingsMap.get(item.endSegmentId);
    if (!startTiming || !endTiming) {
      throw new Error(
        `分镜 ${item.sceneId} 引用的段落 ${item.startSegmentId}..${item.endSegmentId} 在 timings 中不存在。`
      );
    }

    const startSec = i === 0 ? 0 : scenes[i - 1].endSec;
    const isLast = i === plan.scenes.length - 1;
    let endSec = isLast ? totalDurationSec : endTiming.endSec;

    if (!isLast) {
      const nextStartTiming = timingsMap.get(plan.scenes[i + 1].startSegmentId);
      if (nextStartTiming && nextStartTiming.startSec > endTiming.endSec) {
        // Place scene cut cleanly at the midpoint of the inter-segment silence gap
        endSec = Number(((endTiming.endSec + nextStartTiming.startSec) / 2).toFixed(2));
      }
    }

    scenes.push({
      sceneId: item.sceneId,
      actId: item.actId,
      startSegmentId: item.startSegmentId,
      endSegmentId: item.endSegmentId,
      startSec,
      endSec: Math.max(startSec + 1, endSec),
      layout: item.layout,
      motion: item.motion,
      ...(item.imagePrompt ? { imagePrompt: item.imagePrompt } : {}),
      ...(item.imageFile ? { imageFile: item.imageFile } : {}),
      ...(prevHashes.has(item.sceneId) ? { promptHash: prevHashes.get(item.sceneId) } : {}),
      ...(item.overlay ? { overlay: item.overlay } : {}),
    });
  }

  const storyboard: VideoStoryboard = {
    schemaVersion: '1.0',
    bookSlug: episode.bookSlug,
    bookTitle: episode.bookTitle,
    episodeTitle: episode.episodeTitle,
    audioProvider: provider,
    aspectRatio: '16:9',
    fps: 24,
    width: 1920,
    height: 1080,
    totalDurationSec,
    generatedAt: new Date().toISOString(),
    styleBible: DEFAULT_VIDEO_STYLE_BIBLE,
    scenes,
  };

  await fs.mkdir(videoDir, { recursive: true });
  await fs.writeFile(storyboardPath, `${JSON.stringify(storyboard, null, 2)}\n`, 'utf8');
  const imageSceneCount = scenes.filter((s) => Boolean(s.imageFile)).length;
  console.log(
    `[done] artifacts/${bookSlug}/video/storyboard.json (${scenes.length} scenes, ${imageSceneCount} illustrations, ${totalDurationSec}s)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
