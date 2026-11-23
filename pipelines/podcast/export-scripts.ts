import fs from 'node:fs/promises';
import path from 'node:path';
import {
  PODCAST_EPISODES,
  getPodcastEpisodeByBookSlug,
} from '../../content/podcast/registry.ts';
import { formatMarkdownPodcastScript } from '../../content/podcast/script.ts';

function readArg(args: string[], flag: string): string | null {
  const idx = args.indexOf(flag);
  if (idx >= 0 && args[idx + 1]) {
    return args[idx + 1];
  }
  return null;
}

async function main() {
  const args = process.argv.slice(2);
  const targetSlug = readArg(args, '--book');

  const episodes = targetSlug
    ? (() => {
        const found = getPodcastEpisodeByBookSlug(targetSlug);
        if (!found) {
          throw new Error(`未找到书目 ${targetSlug} 的播客演播稿。`);
        }
        return [found];
      })()
    : PODCAST_EPISODES;

  const artifactsRoot = path.resolve(process.cwd(), 'artifacts');

  for (const episode of episodes) {
    const outDir = path.join(artifactsRoot, episode.bookSlug, 'podcast');
    await fs.mkdir(outDir, { recursive: true });
    const outPath = path.join(outDir, 'script.md');
    const markdown = formatMarkdownPodcastScript(episode);
    await fs.writeFile(outPath, `${markdown}\n`, 'utf8');
    console.log(`[exported] artifacts/${episode.bookSlug}/podcast/script.md`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
