import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import * as path from 'path';
import type { Config } from './config';
import swcPlugin from './swcPlugin';

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
    devServer: {
      allowedHosts: 'all',
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
      onBeforeSetupMiddleware({ app }) {
        app.use((req, res, next) => {
          // set cros for all served files
          res.set('Access-Control-Allow-Origin', '*');
          next();
        });
      },
      setupMiddlewares: middlewares,
    },
  };
};
