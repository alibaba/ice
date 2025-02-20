import { defineConfig } from '@ice/app';
import runtimeNext from '@ice/plugin-runtime-next';

export default defineConfig(() => ({
  ssg: false,
  plugins: [
    runtimeNext(),
  ],
}));
