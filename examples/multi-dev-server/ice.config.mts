import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  ssr: true,
  publicPath: '/web1/',
  define: {
    APP_NAME: JSON.stringify('app-1'),
  },
  environments: {
    web2: {
      publicPath: '/web2/',
      outputDir: 'build-web2',
      define: {
        APP_NAME: JSON.stringify('app-2'),
      },
    },
  },
}));
