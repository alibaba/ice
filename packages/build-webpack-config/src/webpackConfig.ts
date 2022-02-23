import type { Configuration } from 'webpack';
import type { IFrameworkConfig } from './frameworkConfig';

interface GetWebpackConfigOptions {
  dir: string;
  frameworkConfig: IFrameworkConfig;
}

export function getWebpackConfig({ dir, frameworkConfig }: GetWebpackConfigOptions): Configuration {
  const {
    entry,
    externals,
    publicPath,
    outputDir,
    sourceMap,
  } = frameworkConfig;

  return {
    entry,
    externals,
    output: {
      publicPath,
      path: outputDir,
    },
    // devtool: typeof sourceMap === 'string' ? sourceMap :
  };
}
