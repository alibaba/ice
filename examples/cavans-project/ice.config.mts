import { defineConfig } from '@ice/app';
import canvasPlugin from '@ice/plugin-canvas';

export default defineConfig(() => ({
  plugins: [
    canvasPlugin(),
  ],
  ssr: true,
  ssg: false,
}));
