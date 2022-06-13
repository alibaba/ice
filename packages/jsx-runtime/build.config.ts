import { defineConfig } from '@ice/pkg';

export default defineConfig({
  bundle: {
    filename: 'jsx-runtime',
    formats: ['umd'],
  },
  transform: {
    formats: ['esm'],
  },
});
