/* eslint-disable import/no-dynamic-require, global-require */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPluginImport = require('webpack-plugin-import');
const getWebOutputPath = require('./utils/getWebOutputPath');
const getFilePath = require('./utils/getFilePath');
const collect = require('./utils/collect');
const { WEB } = require('./config/constants');

// eslint-disable-next-line
const chalk = require('chalk');

module.exports = (api, { target, webpackConfig, babelConfig }) => {
  const { context, log } = api;
  const { command, rootDir, webpack, commandArgs, pkg } = context;
  const appMode = commandArgs.mode || command;
  collect({ command, log, rootDir, pkg });

  const mode = command === 'start' ? 'development' : 'production';
  // 1M = 1024 KB = 1048576 B
  webpackConfig.performance.maxAssetSize(1048576).maxEntrypointSize(1048576);

  // setup DefinePlugin, HtmlWebpackPlugin and  CopyWebpackPlugin out of onGetWebpackConfig
  // in case of registerUserConfig will be excute before onGetWebpackConfig

  // DefinePlugin
  const defineVariables = {
    'process.env.NODE_ENV': JSON.stringify(mode || 'development'),
    'process.env.APP_MODE': JSON.stringify(appMode),
    'process.env.SERVER_PORT': JSON.stringify(commandArgs.port),
  };

  const outputPath = getWebOutputPath(context, { target });

  webpackConfig
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
          to: path.resolve(rootDir, outputPath),
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
      if (webpackConfig.module.rules.get(rule)) {
        webpackConfig.module
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
  webpackConfig.module.rule('appJSON')
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

    // set hot reload plugin
    webpackConfig
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
  }

  return webpackConfig;
};
