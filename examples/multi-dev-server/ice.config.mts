import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  ssr: true,
  publicPath: '/web1/',
  devPublicPath: '/web1/',
  define: {
    APP_NAME: JSON.stringify('app-1'),
  },
  environments: {
    web2: {
      // fixme: 这里的 publicPath 在 dev 阶段也生效了，这是不符合预期的
      publicPath: '/web2/',
      outputDir: 'build-web2',
      devPublicPath: '/web2/',
      define: {
        APP_NAME: JSON.stringify('app-2'),
      },
    },
  },
}));
