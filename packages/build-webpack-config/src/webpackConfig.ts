import type { Configuration } from 'webpack';
import type { IFrameworkConfig } from './frameworkConfig';

export function getWebpackConfig(
  {
    dir,
    frameworkConfig,
  }: {
  dir: string,
  frameworkConfig: IFrameworkConfig
}): Configuration {
  const {
    entry,
    externals,
    publicPath,
    outputDir,
    sourceMap
  } = frameworkConfig;

  return {
    entry,
    externals,
    output: {
      publicPath,
      path: outputDir,
    },
    // devtool: typeof sourceMap === 'string' ? sourceMap : 
  }
}
