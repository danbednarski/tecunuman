import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // GitHub Pages deployment: repository is served at /tecunuman/
  base: process.env.NODE_ENV === 'production' ? '/tecunuman/' : '/',

  // Keep it simple - serve from root, just like before
  root: '.',

  // Development server settings
  server: {
    port: 8080,
    open: false,
  },

  // Build output
  build: {
    outDir: 'dist',
    // Don't minify for now - easier debugging
    minify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        game: resolve(__dirname, 'game.ts'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          // Keep game.js at the root of dist with its original name
          return chunkInfo.name === 'game' ? 'game.js' : 'assets/[name]-[hash].js';
        },
      },
    },
  },
});

