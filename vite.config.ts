import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: process.env.VITE_BASE_PATH || './',
    plugins: [
      react(),
      tailwindcss(),
      {
        // The production bundle has no module imports. Loading it as a classic
        // deferred script lets it run when dist/index.html is opened via file://.
        name: 'file-protocol-script',
        apply: 'build',
        transformIndexHtml: {
          order: 'post',
          handler(html) {
            return html
              .replace(
                /<script type="module" crossorigin src="(\.\/assets\/[^\"]+\.js)"><\/script>/,
                '<script defer src="$1"></script>',
              )
              // A CORS-mode stylesheet request can fail under file://. The
              // local stylesheet is safe to load without this attribute.
              .replace(
                /<link rel="stylesheet" crossorigin href="(\.\/assets\/[^\"]+\.css)">/,
                '<link rel="stylesheet" href="$1">',
              );
          },
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
