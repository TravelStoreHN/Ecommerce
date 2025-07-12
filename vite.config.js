import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import { generateCSP } from './src/config/csp.js';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ command }) => {
  const csp = generateCSP();
  const isProduction = command === 'build';

  return {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          tags: [
            // Temporarily disabled CSP for Auth0 testing
            // {
            //   tag: 'meta',
            //   injectTo: 'head-prepend',
            //   attrs: {
            //     'http-equiv': 'Content-Security-Policy',
            //     content: csp,
            //   },
            // },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base: '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  };
});
