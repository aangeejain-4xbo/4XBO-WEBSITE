import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          // Split stable vendor libs into their own long-cached chunks so app
          // code changes don't bust them. (three / @react-three are left to
          // natural code-splitting — they only load inside lazy 3D routes.)
          // NOTE: 'react-dom' alone only captures the tiny re-export shell —
          // the ~180 KB react-dom-client body + scheduler land in the app
          // chunk and get cache-busted on every deploy. List the deep entries
          // explicitly so the whole React runtime stays in react-vendor.
          manualChunks: {
            'react-vendor': ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client', 'scheduler'],
            'motion-vendor': ['motion'],
            'icons-vendor': ['lucide-react'],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
