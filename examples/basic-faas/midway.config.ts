import { defineConfig } from '@midwayjs/hooks';

export default defineConfig({
  source: 'src/apis',
  routes: [
    {
      baseDir: 'render',
      basePath: '/',
    },
    {
      baseDir: 'lambda',
      basePath: '/api',
    },
  ],
});
