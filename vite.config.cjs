const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const path = require('path');

module.exports = defineConfig({
  plugins: [react()],
  base: './',
  css: {
    postcss: './postcss.config.cjs'
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        format: 'es',
        inlineDynamicImports: true
      }
    },
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
        pure_funcs: ['console.log']
      },
      format: {
        comments: false
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
    include: ['react', 'react-dom']
  },
  server: {
    headers: {
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
