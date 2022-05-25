import * as path from 'path';
import type { Config } from '@ice/types';

const getWebTask = ({ rootDir, command }): Config => {
  // basic task config of web task
  return {
    mode: command === 'start' ? 'development' : 'production',
    sourceMap: command === 'start' ? 'cheap-module-source-map' : false,
    cacheDirectory: path.join(rootDir, 'node_modules', '.cache', 'webpack'),
    outputDir: path.join(rootDir, 'build'),
    alias: {
      ice: path.join(rootDir, '.ice', 'index.ts'),
      '@': path.join(rootDir, 'src'),
      // set alias for webpack/hot while webpack has been prepacked
      'webpack/hot': '@ice/bundles/compiled/webpack/hot',
    },
  };
};

export default getWebTask;
