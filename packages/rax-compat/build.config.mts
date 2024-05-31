import { defineConfig } from '@ice/pkg';

export default defineConfig({
  transform: {
    formats: ['esm', 'es2017'],
  },
  sourceMaps: process.env.NODE_ENV === 'development',
  plugins: [
    './plugin.mjs',
  ],
});
