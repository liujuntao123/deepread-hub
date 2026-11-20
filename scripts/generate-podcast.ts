import 'dotenv/config';
import {
  getPodcastAudioStatus,
  isFishApiKeyConfigured,
  synthesizePodcastEpisode,
} from '../server/ttsEngine.ts';
import { getPodcastEpisodeByBookSlug } from '../src/data/podcastEpisodesData.ts';
import type { PodcastTtsProvider } from '../src/types/podcast.ts';

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

  for (const target of targets) {
    if (target === 'fish' && !isFishApiKeyConfigured()) {
      console.warn(
        '[skip] FISH_API_KEY 未设置，跳过 Fish Audio s2.1-pro-free 合成（可在环境变量中配置 FISH_API_KEY 后重跑任务）。'
      );
      continue;
    }

    const result = await synthesizePodcastEpisode(target, episode, (msg: string) => {
      console.log(msg);
    });
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
