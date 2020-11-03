const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs-extra');

module.exports = (api, { webpackConfig, babelConfig }) => {
  const { context } = api;
  const { rootDir, command, webpack, commandArgs } = context;
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

  // Copy public dir
  if (fs.existsSync(path.resolve(rootDir, 'public'))) {
    webpackConfig.plugin('CopyWebpackPlugin').use(CopyWebpackPlugin, [[]]);
  }


  // Process app.json file
  webpackConfig.module
    .rule('appJSON')
    .type('javascript/auto')
    .test(/app\.json$/)
    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .options(babelConfig)
    .end()
    .use('loader')
    .loader(require.resolve('./loaders/AppConfigLoader'));

  if (command === 'start') {
    // disable build-scripts stats output
    process.env.DISABLE_STATS = true;

    webpackConfig
      .plugin('friendly-error')
      .use(require.resolve('friendly-errors-webpack-plugin'), [
        {
          clearConsole: false,
        },
      ])
      .end();
  }

  return webpackConfig;
};
