let ESLintReportingPluginUsed = false;
const FriendlyError =  require('@builder/pack/deps/@nuxtjs/friendly-errors-webpack-plugin');
const ESLintReportingPlugin = require('@builder/pack/deps/eslint-reporting-webpack-plugin');
const configWebpack5 = require('./webpack5');

module.exports = (api, { webpackConfig }) => {
  const { context } = api;
  const { command, webpack, commandArgs, userConfig } = context;
  const appMode = commandArgs.mode || command;

  const mode = command === 'start' ? 'development' : 'production';
  // 1M = 1024 KB = 1048576 B
  webpackConfig.performance.maxAssetSize(1048576).maxEntrypointSize(1048576);

  // setup DefinePlugin and CopyWebpackPlugin out of onGetWebpackConfig
  // in case of registerUserConfig will be excute before onGetWebpackConfig

  // DefinePlugin
  const defineVariables = {
    'process.env.NODE_ENV': JSON.stringify(mode || 'development'),
    'process.env.APP_MODE': JSON.stringify(appMode),
    'process.env.SERVER_PORT': JSON.stringify(commandArgs.port),
  };

  webpackConfig
    .plugin('DefinePlugin')
    .use(webpack.DefinePlugin, [defineVariables]);

  if (userConfig.eslint === undefined && !ESLintReportingPluginUsed) {
    // Add friendly eslint reporting
    webpackConfig
      .plugin('ESLintReportingPlugin')
      .use(ESLintReportingPlugin);
    ESLintReportingPluginUsed = true;
  }

  if (command === 'start') {
    // disable build-scripts stats output
    process.env.DISABLE_STATS = true;
    webpackConfig
      .plugin('friendly-error')
      .use(FriendlyError, [
        {
          clearConsole: false,
        },
      ]);
  } else {
    webpackConfig.optimization.minimize(true);
  }

  // rax-app will add webpack5 field to userConfig
  if (!Object.prototype.hasOwnProperty.call(userConfig, 'webpack5') || userConfig.webpack5) {
    configWebpack5(webpackConfig, context);
  }

  return webpackConfig;
};
