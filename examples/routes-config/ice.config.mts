import { defineConfig } from '@ice/app';
import routeConfig from './src/routes';

export default defineConfig({
  routes: {
    ignoreFiles: ['**'],
    config: routeConfig,
  },
});
