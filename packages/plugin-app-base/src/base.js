const getWebpackConfig = require('rax-webpack-config');
const getBabelConfig = require('rax-babel-config');
const ProgressPlugin = require('webpackbar');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs-extra');

module.exports = (api, { target, babelConfigOptions, progressOptions }) => {
  const { context } = api;
  const { rootDir, command, webpack, commandArgs } = context;
  const appMode = commandArgs.mode || command;
  const babelConfig = getBabelConfig(babelConfigOptions);

  const mode = command === 'start' ? 'development' : 'production';
  const config = getWebpackConfig({
    rootDir,
    mode,
    babelConfig,
    target
  });
  // 1M = 1024 KB = 1048576 B
  config.performance.maxAssetSize(1048576).maxEntrypointSize(1048576);

  // setup DefinePlugin and CopyWebpackPlugin out of onGetWebpackConfig
  // in case of registerUserConfig will be excute before onGetWebpackConfig

  // DefinePlugin
  const defineVariables = {
    'process.env.NODE_ENV': JSON.stringify(mode || 'development'),
    'process.env.APP_MODE': JSON.stringify(appMode),
    'process.env.SERVER_PORT': JSON.stringify(commandArgs.port),
  };

  config
    .plugin('ProgressPlugin')
    .use(ProgressPlugin, [Object.assign({ color: '#F4AF3D' } ,progressOptions)])
    .end()
    .plugin('DefinePlugin')
    .use(webpack.DefinePlugin, [defineVariables]);

  // Copy public dir
  if (fs.existsSync(path.resolve(rootDir, 'public'))) {
    config
      .plugin('CopyWebpackPlugin')
      .use(CopyWebpackPlugin, [[]]);
  }

  config.plugin('friendly-error')
    .use(require.resolve('friendly-errors-webpack-plugin'), [
      {
        clearConsole: false,
      }
    ])
    .end();

  // Process app.json file
  config.module
    .rule('appJSON')
    .type('javascript/auto')
    .test(/app\.json$/)
    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .options(babelConfig)
    .end()
    .use('loader')
    .loader(require.resolve('./loaders/AppConfigLoader'));

  ['jsx', 'tsx'].forEach((ruleName) => {
    config.module
      .rule(ruleName)
      .use('platform-loader')
      .loader(require.resolve('rax-compile-config/src/platformLoader'));
  });

  if (command === 'start') {
    // disable build-scripts stats output
    process.env.DISABLE_STATS = true;
  }

  return config;
};
