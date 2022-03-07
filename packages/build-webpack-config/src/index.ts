import * as path from 'path';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Config } from '@ice/types';
import { createUnplugin } from 'unplugin';
import getTransformPlugins from './plugins/index.js';

const watchIgnoredRegexp = process.env.RUNTIME_DEBUG ? /node_modules/ : /node_modules|[/\\]\.ice[/\\]|[/\\]\.rax[/\\]/;

interface GetWebpackConfigOptions {
  rootDir: string;
  config: Config;
}
type GetWebpackConfig = (options: GetWebpackConfigOptions) => Configuration & { devServer?: DevServerConfiguration };

const getWebpackConfig: GetWebpackConfig = ({ rootDir, config }) => {
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

  // create plugins
  const webpackPlugins = getTransformPlugins(rootDir, config).map((plugin) => createUnplugin(() => plugin).webpack());
  return {
    mode,
    entry: path.join(rootDir, '.ice/entry.client'),
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
        '@': path.join(rootDir, 'src'),
        ...alias,
      },
      extensions: ['.ts', '.tsx', '.jsx', '...'],
    },
    plugins: [
      ...webpackPlugins,
    ],
    devtool: typeof sourceMap === 'string' ? sourceMap : (sourceMap && 'cheap-module-source-map'),
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

export {
  getWebpackConfig,
  getTransformPlugins,
};
