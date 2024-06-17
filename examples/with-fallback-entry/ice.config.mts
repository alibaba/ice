import { defineConfig } from '@ice/app';
import plugin from './plugin';

export default defineConfig(() => ({
  plugins: [plugin()],
  ssr: true,
  server: {
    format: 'cjs',
  }
}));
