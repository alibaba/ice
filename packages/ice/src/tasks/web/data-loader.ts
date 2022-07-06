import * as path from 'path';
import type { Config } from '@ice/types';
import { CACHE_DIR } from '../../constant.js';

const getTask = ({ rootDir, command }): Config => {
  // basic task config of data-loader
  return {
    entry: {
      'data-loader': path.join(rootDir, '.ice/data-loader'),
    },
    mode: command === 'start' ? 'development' : 'production',
    sourceMap: command === 'start' ? 'cheap-module-source-map' : false,
    outputDir: path.join(rootDir, 'build'),
    cacheDir: path.join(rootDir, CACHE_DIR),
    alias: {
      ice: path.join(rootDir, '.ice', 'index.ts'),
      '@': path.join(rootDir, 'src'),
      // set alias for webpack/hot while webpack has been prepacked
      'webpack/hot': '@ice/bundles/compiled/webpack/hot',
    },
    swcOptions: {
      removeExportExprs: ['default', 'getConfig', 'getServerData', 'getStaticData'],
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
