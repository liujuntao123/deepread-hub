import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

/**
 * Local-only Production Workbench (Artifacts 1~4 Inspector).
 * Mounts the fixed local `artifacts/` folder directly as static assets (e.g. /<slug>/podcast/edge.mp3).
 * Intended ONLY for local use on 127.0.0.1 — never deployed publicly.
 */
export default defineConfig(() => {
  const rootDir = import.meta.dirname;
  return {
    root: path.resolve(rootDir, 'apps/workbench'),
    publicDir: path.resolve(rootDir, 'artifacts'),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@content': path.resolve(rootDir, 'content'),
        '@pipelines': path.resolve(rootDir, 'pipelines'),
      },
    },
    build: {
      outDir: path.resolve(rootDir, 'dist-workbench'),
      emptyOutDir: true,
      copyPublicDir: false,
    },
    server: {
      port: 3001,
      host: '127.0.0.1',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      port: 3001,
      host: '127.0.0.1',
    },
  };
});
