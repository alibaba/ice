import { defineConfig } from '@ice/pkg';

export default defineConfig({
  transform: {
    formats: ['esm'],
  },
  sourceMaps: process.env.NODE_ENV === 'development',
});
