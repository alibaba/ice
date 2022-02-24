import type { Configuration } from 'webpack';
import * as path from 'path';
import type { IFrameworkConfig } from './frameworkConfig';
import swcPlugin from './swcPlugin';

interface GetWebpackConfigOptions {
  rootDir: string;
  frameworkConfig: IFrameworkConfig;
}

export function getWebpackConfig({ rootDir, frameworkConfig }: GetWebpackConfigOptions): Configuration {
  const {
    mode,
    externals = {},
    publicPath = '/',
    outputDir = path.join(rootDir, 'build'),
    loaders = [],
    sourceMap,
  } = frameworkConfig;

  return {
    mode,
    entry: path.join(rootDir, 'src/app'),
    externals,
    output: {
      publicPath,
      path: outputDir,
    },
    module: {
      rules: [
        ...loaders,
      ],
    },
    resolve: {
      alias: {
        ice: path.join(rootDir, '.ice', 'index.ts'),
      },
      extensions: ['.ts', '.tsx', '.jsx', '...'],
    },
    plugins: [swcPlugin({ rootDir, sourceMap })],
  };
}
