import * as path from 'path';
import { createRequire } from 'module';
import type { Config } from '@ice/shared-config/types';
import { CACHE_DIR, RUNTIME_TMP_DIR } from '../constant.js';

const require = createRequire(import.meta.url);
const getDefaultTaskConfig = ({ rootDir, command }): Config => {
  // basic task config of web task
  const defaultLogging = command === 'start' ? 'summary' : 'summary assets';

  const envReplacement = path.join(rootDir, RUNTIME_TMP_DIR, 'env.ts');
  const regeneratorRuntimePath = require.resolve('regenerator-runtime');
  return {
    mode: command === 'start' ? 'development' : 'production',
    sourceMap: command === 'start' ? 'cheap-module-source-map' : false,
    cacheDir: path.join(rootDir, CACHE_DIR),
    alias: {
      ice: path.join(rootDir, RUNTIME_TMP_DIR, 'index.ts'),
      'ice/types': path.join(rootDir, RUNTIME_TMP_DIR, 'type-defines.ts'),
      '@': path.join(rootDir, 'src'),
      // set alias for webpack/hot while webpack has been prepacked
      'webpack/hot': '@ice/bundles/compiled/webpack/hot',
      // Get absolute path of `regenerator-runtime`, `@swc/helpers`
      // so it's unnecessary to add it to project dependencies.
      'regenerator-runtime/runtime.js': regeneratorRuntimePath,
      'regenerator-runtime': regeneratorRuntimePath,
      '@swc/helpers': path.dirname(require.resolve('@swc/helpers/package.json')),
      'universal-env': envReplacement,
      '@uni/env': envReplacement,
    },
    assetsManifest: true,
    fastRefresh: command === 'start',
    logging: process.env.WEBPACK_LOGGING || defaultLogging,
    minify: command === 'build',
    useDevServer: true,
  };
};

export default getDefaultTaskConfig;
