import * as path from 'path';
import { createRequire } from 'module';
import type { Config } from '@ice/shared-config/types';
import { CACHE_DIR, RUNTIME_TMP_DIR, WEB } from '../../constant.js';

const require = createRequire(import.meta.url);
const getWebTask = ({ rootDir, command, userConfig }): Config => {
  // basic task config of web task
  const defaultLogging = command === 'start' ? 'summary' : 'summary assets';
  const removeExportExprs = ['serverDataLoader', 'staticDataLoader'];

  // Remove dataLoader exports only when build in production
  // and configure to generate data-loader.js.
  if (command === 'build' && userConfig.dataLoader) {
    removeExportExprs.push('dataLoader');
  }

  const envReplacement = path.join(rootDir, RUNTIME_TMP_DIR, 'env.ts');
  return {
    mode: command === 'start' ? 'development' : 'production',
    sourceMap: command === 'start' ? 'cheap-module-source-map' : false,
    cacheDir: path.join(rootDir, CACHE_DIR),
    alias: {
      ice: path.join(rootDir, RUNTIME_TMP_DIR, 'index.ts'),
      '@': path.join(rootDir, 'src'),
      // set alias for webpack/hot while webpack has been prepacked
      'webpack/hot': '@ice/bundles/compiled/webpack/hot',
      // Get absolute path of `regenerator-runtime`, `@swc/helpers`
      // so it's unnecessary to add it to project dependencies.
      'regenerator-runtime': require.resolve('regenerator-runtime'),
      '@swc/helpers': path.dirname(require.resolve('@swc/helpers/package.json')),
      'universal-env': envReplacement,
      '@uni/env': envReplacement,
      'react-server-dom-webpack/client': require.resolve('react-server-dom-webpack/client.browser'),
    },
    swcOptions: {
      removeExportExprs,
    },
    assetsManifest: true,
    fastRefresh: command === 'start',
    logging: process.env.WEBPACK_LOGGING || defaultLogging,
    minify: command === 'build',
    useDevServer: true,
    useDataLoader: true,
    target: WEB,
  };
};

export default getWebTask;
