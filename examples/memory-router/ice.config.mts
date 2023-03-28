import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  publicPath: '/',
  ssr: false,
  ssg: false,
  splitChunks: false,
  routes: {
    injectInitialEntry: true,
  }
}));
