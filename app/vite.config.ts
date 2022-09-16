import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';

export default defineConfig(() => {
  return {
    build: { target: ['ES2020'] },
    optimizeDeps: {
      esbuildOptions: {
        target: 'ES2020',
      },
    },
    plugins: [qwikVite()],
  };
});
