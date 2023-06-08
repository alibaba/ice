import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  publicPath: '/',
  optimization: {
    router: true,
  },
  ssr: true,
}));
