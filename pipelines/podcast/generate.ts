import 'dotenv/config';
import {
  getPodcastAudioStatus,
  isFishApiKeyConfigured,
  synthesizePodcastEpisode,
} from './ttsEngine.ts';
import { getPodcastEpisodeByBookSlug } from '../../content/podcast/registry.ts';
import type { PodcastTtsProvider } from '../../content/podcast/types.ts';

function readArg(args: string[], flag: string, fallback: string): string {
  const idx = args.indexOf(flag);
  if (idx >= 0 && args[idx + 1]) {
    return args[idx + 1];
  }
  return fallback;
}

async function main() {
  const args = process.argv.slice(2);
  const bookSlug = readArg(args, '--book', 'amusing-ourselves-to-death');
  const providerValue = readArg(args, '--provider', 'both');
  const skipExisting = args.includes('--skip-existing');
  const useCache = !args.includes('--no-cache');

  const episode = getPodcastEpisodeByBookSlug(bookSlug);
  if (!episode) {
    throw new Error(`未找到书目 ${bookSlug} 的播客演播稿。`);
  }

  const targets: PodcastTtsProvider[] =
    providerValue === 'both'
      ? ['edge', 'fish']
      : providerValue === 'fish'
        ? ['fish']
        : ['edge'];

  const initialStatus = skipExisting ? await getPodcastAudioStatus(bookSlug) : null;

  for (const target of targets) {
    if (skipExisting && initialStatus?.[target]?.available) {
      console.log(`[skip] ${bookSlug} (${target}) 已存在成品音频，跳过合成（移除 --skip-existing 可强制重生成）。`);
      continue;
    }
    if (target === 'fish' && !isFishApiKeyConfigured()) {
      console.warn(
        '[skip] FISH_API_KEY 未设置，跳过 Fish Audio s2.1-pro-free 合成（可在环境变量中配置 FISH_API_KEY 后重跑任务）。'
      );
      continue;
    }

    const result = await synthesizePodcastEpisode(
      target,
      episode,
      (msg: string) => {
        console.log(msg);
      },
      { useCache }
    );
    console.log(
      `[done] ${result.label}: ${result.audioUrl} | duration=${result.durationSec}s | size=${result.fileSizeBytes} bytes`
    );
  }

  const status = await getPodcastAudioStatus(bookSlug);
  console.log(
    'Current status:',
    JSON.stringify({
      bookSlug: status.bookSlug,
      fishConfigured: isFishApiKeyConfigured(),
      edgeAvailable: status.edge.available,
      edgeDurationSec: status.edge.durationSec,
      fishAvailable: status.fish.available,
      fishDurationSec: status.fish.durationSec,
    })
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
