const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPluginImport = require('webpack-plugin-import');
const { getFilePath, getWebOutputPath } = require('./utils');
const { WEB } = require('./constants');

module.exports = (api, { target, webpackConfig }) => {
  const { context } = api;
  const { rootDir } = context;
  const outputPath = getWebOutputPath(context, { target });
  webpackConfig
  // SimpleProgressPlugin
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

  return webpackConfig;
};
