import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateCSP } from './src/config/csp.cjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    {
      name: 'configure-response-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Set CSP header
          res.setHeader('Content-Security-Policy', generateCSP());
          
          // Set proper MIME types for JavaScript and TypeScript files
          if (req.url.match(/\.(js|mjs|jsx|ts|tsx)$/)) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
          }
          
          // Set X-Content-Type-Options to prevent MIME type sniffing
          res.setHeader('X-Content-Type-Options', 'nosniff');
          
          next();
        });
      }
    }
  ],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        format: 'es',
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    },
    target: 'es2015',
    minify: mode === 'production',
    sourcemap: mode !== 'production'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2015'
    }
  },
  server: {
    port: 5174,
    strictPort: true,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'X-Content-Type-Options': 'nosniff'
    },
    middlewareMode: false
  }
})); 