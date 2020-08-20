/* eslint-disable import/no-dynamic-require, global-require */
const path = require('path');
const { getWebpackConfig, getBabelConfig } = require('build-scripts-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPluginImport = require('webpack-plugin-import');
const defaultConfig = require('./config/default.config');
const getFilePath = require('./utils/getFilePath');
const collect = require('./utils/collect');
const { WEB } = require('./constants');

// eslint-disable-next-line
const chalk = require('chalk');


module.exports = (api, { isMiniapp, target }) => {
  const { context, log } = api;
  const { command, rootDir, webpack, commandArgs, pkg } = context;
  const appMode = commandArgs.mode || command;
  collect({ command, log, rootDir, pkg });
  const babelConfig = getBabelConfig();

  const mode = command === 'start' ? 'development' : 'production';
  const config = getWebpackConfig(mode);
  // 1M = 1024 KB = 1048576 B
  config.performance.maxAssetSize(1048576).maxEntrypointSize(1048576);

  // setup DefinePlugin, HtmlWebpackPlugin and  CopyWebpackPlugin out of onGetWebpackConfig
  // in case of registerUserConfig will be excute before onGetWebpackConfig

  // DefinePlugin
  const defineVariables = {
    'process.env.NODE_ENV': JSON.stringify(mode || 'development'),
    'process.env.APP_MODE': JSON.stringify(appMode),
    'process.env.SERVER_PORT': JSON.stringify(commandArgs.port),
  };

  config
    .plugin('SimpleProgressPlugin')
      .tap(([args]) => {
        return [{
          ...args,
          progressOptions: {
            clear: true,
            callback: () => {
              console.log();
            }
          }
        }];
      })
      .end()
    .plugin('DefinePlugin')
      .use(webpack.DefinePlugin, [defineVariables])
      .end()
    // HtmlWebpackPlugin
    .plugin('HtmlWebpackPlugin')
      .use(HtmlWebpackPlugin, [{
        inject: true,
        templateParameters: {
          NODE_ENV: process.env.NODE_ENV,
        },
        favicon: getFilePath([
          path.join(rootDir, 'public/favicon.ico'),
          path.join(rootDir, 'public/favicon.png'),
        ]),
        template: path.resolve(rootDir, 'public/index.html'),
        minify: false,
      }])
      .end()
    // CopyWebpackPlugin
    .plugin('CopyWebpackPlugin')
      .use(CopyWebpackPlugin, [[
        {
          from: path.resolve(rootDir, 'public'),
          to: path.resolve(rootDir, defaultConfig.outputDir),
          ignore: ['index.html'],
        },
      ]])
      .end()
    // WebpackPluginImport
    .plugin('WebpackPluginImport')
      .use(WebpackPluginImport, [[
        {
          libraryName: /@ali\/ice-.*/,
          stylePath: 'style.js',
        },
      ]])
      .end();

  // Process rpx to vw
  if (target === WEB) {
    const cssPreprocessor = [ 'scss', 'scss-module', 'css', 'css-module', 'less', 'less-module'];
    cssPreprocessor.forEach(rule => {
      if (config.module.rules.get(rule)) {
        config.module
          .rule(rule)
          .use('postcss-loader')
          .tap((options) => {
            const { plugins = [] } = options;
            return {
              ...options,
              plugins: [
                ...plugins,
                // eslint-disable-next-line
                require('postcss-plugin-rpx2vw')
              ],
            };
          });
      }
    });
  }

  // Process app.json file
  config.module.rule('appJSON')
    .type('javascript/auto')
    .test(/app\.json$/)
    .use('babel')
    .loader(require.resolve('babel-loader'))
    .options(babelConfig)
    .end()
    .use('loader')
    .loader(require.resolve('./loaders/AppConfigLoader'));


  config.devServer.set('writeToDisk', isMiniapp);

  if (command === 'start') {
    // disable build-scripts stats output
    process.env.DISABLE_STATS = true;

    // set hot reload plugin
    config
      .plugin('HotModuleReplacementPlugin')
        .use(webpack.HotModuleReplacementPlugin)
        .end()
      .plugin('friendly-error')
        .use(require.resolve('friendly-errors-webpack-plugin'), [
          {
            clearConsole: false,
          }
        ])
      .end();

    if (isMiniapp) {
      config.plugins.delete('HotModuleReplacementPlugin');
      config.devServer.hot(false).inline(false);
    }
  }

  return config;
};
