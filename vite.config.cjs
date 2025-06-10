const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const path = require('path');

module.exports = defineConfig({
  plugins: [react()],
  base: '/', // For custom domain travelstorehn.com
  css: {
    postcss: './postcss.config.cjs'
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  server: {
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/javascript'
    }
  },
  preview: {
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/javascript'
    }
  },
  publicDir: 'public',
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.gif'],
});
