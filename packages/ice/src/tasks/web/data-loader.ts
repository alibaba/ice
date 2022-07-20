import * as path from 'path';
import type { Config } from '@ice/types';
import { CACHE_DIR, DATA_LOADER_ENTRY, RUNTIME_TMP_DIR } from '../../constant.js';
import keepPlatform from '../../utils/keepPlatform.js';

const getTask = ({ rootDir, command }): Config => {
  // basic task config of data-loader
  return {
    entry: {
      'data-loader': path.join(rootDir, DATA_LOADER_ENTRY),
    },
    mode: command === 'start' ? 'development' : 'production',
    sourceMap: command === 'start' ? 'cheap-module-source-map' : false,
    cacheDir: path.join(rootDir, CACHE_DIR),
    alias: {
      ice: path.join(rootDir, RUNTIME_TMP_DIR, 'index.ts'),
      '@': path.join(rootDir, 'src'),
      // set alias for webpack/hot while webpack has been prepacked
      'webpack/hot': '@ice/bundles/compiled/webpack/hot',
    },
    swcOptions: {
      removeExportExprs: ['default', 'getConfig', 'getServerData', 'getStaticData'],
      compilationConfig: {
        jsc: {
          transform: {
            constModules: {
              globals: {
                '@uni/env': keepPlatform('web'),
                'universal-env': keepPlatform('web'),
              },
            },
          },
        },
      },
    },
    splitChunks: false,
    // enable concatenateModules will tree shaking unused `react/react-dom` in dev mod.
    concatenateModules: true,
    devServer: {
      hot: false,
      client: false,
    },
    // always need reload when data loader is changed
    fastRefresh: false,
  };
};

export default getTask;
