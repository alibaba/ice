import { defineConfig } from '@ice/pkg';

// https://pkg.ice.work/reference/config-list/
export default defineConfig({
  transform: {
    formats: ['es2017'],
  },
  sourceMaps: process.env.NODE_ENV === 'development',
});
