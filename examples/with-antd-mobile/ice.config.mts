import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  server: {
    bundle: true,
    format: 'cjs',
  },
}));
