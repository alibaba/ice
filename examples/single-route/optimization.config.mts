import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  publicPath: '/',
  optimization: {
    disableRouter: true,
  },
}));
