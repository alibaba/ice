import * as path from 'path';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Config } from '@ice/types';
import swcPlugin from './swcPlugin.js';

const watchIgnoredRegexp = process.env.RUNTIME_DEBUG ? /node_modules/ : /node_modules|[/\\]\.ice[/\\]|[/\\]\.rax[/\\]/;

interface GetWebpackConfigOptions {
  rootDir: string;
  config: Config;
}
type GetWebpackConfig = (options: GetWebpackConfigOptions) => Configuration & { devServer?: DevServerConfiguration };

export const getWebpackConfig: GetWebpackConfig = ({ rootDir, config }) => {
  const {
    mode,
    externals = {},
    publicPath = '/',
    devPublicPath = '/',
    outputDir = path.join(rootDir, 'build'),
    loaders = [],
    alias = {},
    sourceMap,
    middlewares,
  } = config;

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
        ...alias,
      },
      extensions: ['.ts', '.tsx', '.jsx', '...'],
    },
    plugins: [
      swcPlugin({ rootDir, sourceMap }),
    ],
    devtool: 'source-map',
    devServer: {
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      },
      hot: true,
      compress: true,
      webSocketServer: 'ws',
      devMiddleware: {
        publicPath: devPublicPath,
      },
      static: {
        watch: {
          ignored: watchIgnoredRegexp,
        },
      },
      client: {
        overlay: false,
        logging: 'info',
      },
      setupMiddlewares: middlewares,
    },
  };
};
