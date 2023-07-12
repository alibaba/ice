import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  publicPath: '/',
  ssr: false,
  ssg: false,
  codeSplitting: 'page-vendors',
  routes: {
    injectInitialEntry: true,
  }
}));
