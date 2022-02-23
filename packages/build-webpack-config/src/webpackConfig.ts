import type { Configuration } from 'webpack';
import type { IFrameworkConfig } from './frameworkConfig';

interface GetWebpackConfigOptions {
  rootDir: string;
  frameworkConfig: IFrameworkConfig;
}

export function getWebpackConfig({ rootDir, frameworkConfig }: GetWebpackConfigOptions): Configuration {
  const {
    entry,
    externals,
    publicPath = '/',
    outputDir,
    loaders,
    mode,
    alias = {},
    plugins = [],
  } = frameworkConfig;

  return {
    entry,
    externals,
    output: {
      publicPath,
      path: outputDir,
    },
    module: {
      rules: loaders,
    },
    resolve: {
      alias,
      extensions: ['.ts', '.tsx', '.jsx', '...'],
    },
    mode,
    plugins,
  };
}
