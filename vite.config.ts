import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

/**
 * Public static Web Reader (Artifact 1: Deep Reading Content ONLY).
 * Strictly isolated from local podcast scripts, audio files, raw book sources, and production pipelines.
 */
export default defineConfig(() => {
  const rootDir = import.meta.dirname;
  return {
    root: path.resolve(rootDir, 'apps/web'),
    publicDir: path.resolve(rootDir, 'apps/web/public'),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@content': path.resolve(rootDir, 'content'),
      },
    },
    build: {
      outDir: path.resolve(rootDir, 'dist'),
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});
