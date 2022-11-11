import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  postcss: {
    plugins: [
      'tailwindcss',
    ],
  },
}));
