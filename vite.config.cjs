const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const path = require('path');
const { generateCSP } = require('./src/config/csp.cjs');

module.exports = defineConfig(({ mode }) => ({
  plugins: [
    react(),
    {
      name: 'configure-response-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader('Content-Security-Policy', generateCSP());
          next();
        });
      }
    }
  ],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    },
    target: 'es2015',
    minify: mode === 'production',
    sourcemap: mode !== 'production'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode)
  }
}));
