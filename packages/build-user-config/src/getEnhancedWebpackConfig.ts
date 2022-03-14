import type { IPluginAPI } from 'build-scripts';
import configWebpack5 from './webpack5';
import loadEnvironment from './utils/loadEnvironment';
import getClientEnvironment from './utils/getClientEnvironment';

export default (api: IPluginAPI, { webpackConfig }) => {
  const { context, setValue } = api;
  const { command, webpack, commandArgs, userConfig, rootDir } = context;
  const appMode = commandArgs.mode || command;

  const mode = command === 'start' ? 'development' : 'production';

  // load .env.development for start and load .env.production for build
  const envMode = commandArgs.mode || mode;
  const customEnv = loadEnvironment(rootDir, envMode);
  const clientEnv = getClientEnvironment(customEnv);
  setValue('CLIENT_ENV', clientEnv.raw);
  // 1M = 1024 KB = 1048576 B
  webpackConfig.performance.maxAssetSize(1048576).maxEntrypointSize(1048576);

  // setup DefinePlugin out of onGetWebpackConfig
  // in case of registerUserConfig will be execute before onGetWebpackConfig
  // default value for DefinePlugin
  const defineVariables = {
    ...clientEnv.stringified,
    'process.env.NODE_ENV': JSON.stringify(mode || 'development'),
    'process.env.APP_MODE': JSON.stringify(appMode),
    'process.env.SERVER_PORT': JSON.stringify(commandArgs.port),
    'process.env.__IS_SERVER__': false,
  };

  // set alias for webpack/hot while webpack has been prepacked
  webpackConfig.resolve.alias.set('webpack/hot', '@builder/pack/deps/webpack/hot');

  webpackConfig
    .plugin('DefinePlugin')
    .use(webpack.DefinePlugin, [defineVariables]);

  if (command === 'start') {
    // disable build-scripts stats output
    process.env.DISABLE_STATS = 'true';
    webpackConfig
      .plugin('friendly-error')
      // eslint-disable-next-line global-require
      .use(require('@builder/pack/deps/@nuxtjs/friendly-errors-webpack-plugin'), [
        {
          clearConsole: false,
        },
      ]);
  } else {
    webpackConfig.optimization.minimize(true);
  }

  // rax-app will add webpack5 field to userConfig
  if (!Object.prototype.hasOwnProperty.call(userConfig, 'webpack5') || userConfig.webpack5) {
    configWebpack5(webpackConfig, api);
  }

  return webpackConfig;
};
