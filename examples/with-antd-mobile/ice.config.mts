import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  polyfill: 'usage',
  server: {
    bundle: true,
    format: 'cjs',
  },
}));
