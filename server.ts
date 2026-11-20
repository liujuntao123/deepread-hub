import 'dotenv/config';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import { getPodcastAudioStatus } from './server/ttsEngine.ts';
import {
  AMUSING_FULL_PODCAST,
  getPodcastEpisodeByBookSlug,
} from './src/data/podcastEpisodesData.ts';
import { formatMarkdownPodcastScript } from './src/utils/podcastScript.ts';

const PORT = Number(process.env.PORT ?? 3000);
const IS_PROD = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/podcast/status', async (req, res) => {
    try {
      const bookSlug =
        typeof req.query.book === 'string' && req.query.book.trim()
          ? req.query.book.trim()
          : AMUSING_FULL_PODCAST.bookSlug;
      const status = await getPodcastAudioStatus(bookSlug);
      res.json(status);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : '读取播客音频状态失败',
      });
    }
  });

  app.get('/api/podcast/script.md', (req, res) => {
    const bookSlug =
      typeof req.query.book === 'string' && req.query.book.trim()
        ? req.query.book.trim()
        : AMUSING_FULL_PODCAST.bookSlug;
    const episode = getPodcastEpisodeByBookSlug(bookSlug);
    if (!episode) {
      res.status(404).send('Not found');
      return;
    }
    const markdown = formatMarkdownPodcastScript(episode);
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${episode.bookSlug}-podcast-script.md"`
    );
    res.send(markdown);
  });

  const audioDir = path.resolve(process.cwd(), 'public/audio');
  app.use('/audio', express.static(audioDir));

  if (!IS_PROD) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', async (_req, res) => {
      const indexPath = path.join(distDir, 'index.html');
      const html = await fs.readFile(indexPath, 'utf8');
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
