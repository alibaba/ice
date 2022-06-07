import { defineConfig } from '@ice/pkg';

export default defineConfig({
  bundle: {
    filename: 'jsx-runtime',
    formats: ['umd', 'es2017'],
  },
  transform: {
    formats: ['esm', 'es2017'],
  },
});
