let ESLintReportingPluginUsed = false;
const FriendlyError =  require('@builder/pack/deps/@nuxtjs/friendly-errors-webpack-plugin');

module.exports = (api, { target, webpackConfig, babelConfig, libName = 'rax' }) => {
  const { context } = api;
  const { command, webpack, commandArgs, userConfig } = context;
  const appMode = commandArgs.mode || command;
  const mpa = userConfig[target] && (userConfig[target].subPackages || userConfig[target].mpa);

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
      .use(require.resolve('@builder/pack/deps/eslint-reporting-webpack-plugin'));
    ESLintReportingPluginUsed = true;
  }
  // Process app.json file
  webpackConfig.module
    .rule('appJSON')
    .type('javascript/auto')
    .test(/app\.json$/)
    .use('babel-loader')
    .loader(require.resolve('@builder/pack/deps/babel-loader'))
    .options(babelConfig)
    .end()
    .use('loader')
    .loader(require.resolve('./loaders/AppConfigLoader'))
    .options({
      libName,
      target,
      mpa
    });

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

  return webpackConfig;
};
