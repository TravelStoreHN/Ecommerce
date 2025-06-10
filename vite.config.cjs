const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const path = require('path');

module.exports = defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'classic' }]
        ]
      }
    })
  ],
  base: './',
  css: {
    postcss: './postcss.config.cjs'
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        inlineDynamicImports: true,
        manualChunks: undefined
      }
    },
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      parse: {
        bare_returns: false
      },
      compress: {
        arrows: false,
        collapse_vars: false,
        comparisons: false,
        computed_props: false,
        hoist_props: false,
        inline: false,
        loops: false,
        negate_iife: false,
        properties: false,
        reduce_funcs: false,
        reduce_vars: false,
        switches: false,
        typeofs: false,
        booleans: true,
        if_return: true,
        sequences: true,
        unused: true,
        conditionals: true,
        dead_code: true,
        evaluate: false
      },
      mangle: false,
      module: false
    },
    sourcemap: false,
    cssCodeSplit: false
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
