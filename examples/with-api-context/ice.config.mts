import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  server: {
    onDemand: true,
    format: 'esm',
  },
}));