const path = require('path');
const HtmlWebpackPlugin = require('@builder/pack/deps/html-webpack-plugin');
const CopyWebpackPlugin = require('@builder/pack/deps/copy-webpack-plugin');
const WebpackPluginImport = require('webpack-plugin-import');
const WebpackPluginQueryLoader = require('query-loader-webpack-plugin').default;
const { getFilePath, getWebOutputPath } = require('./utils');

module.exports = (api, { target, webpackConfig }) => {
  const { context, modifyUserConfig, getValue } = api;
  const { rootDir, userConfig } = context;
  const outputPath = getWebOutputPath(context, { target });
  const clientEnv = getValue('CLIENT_ENV');
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
          // add template params for html webpack plugin
          ...(clientEnv || {}),
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
      .use(CopyWebpackPlugin, [{
        patterns: [
          {
            from: path.resolve(rootDir, 'public'),
            to: path.resolve(rootDir, outputPath),
            noErrorOnMissing: true,
            // skip for minimization
            info: {
              minimized: true,
            },
            globOptions: {
              dot: true,
              gitignore: true,
              ignore: ['**/public/index.html'],
            },
          },
        ]
      }])
      .end()
    // WebpackPluginImport
    .plugin('WebpackPluginImport')
      .use(WebpackPluginImport)
      .end()
    .plugin('WebpackPluginQueryLoader')
      .use(WebpackPluginQueryLoader);
  // auto inject style.js of component (webpack-plugin-import) in mode vite
  if (userConfig.vite) {
    modifyUserConfig('vite.plugins', (vitePlugins) => {
      // eslint-disable-next-line global-require
      return [...(vitePlugins || []), require('vite-plugin-component-style').default()];
    });
  }

  webpackConfig.resolve.merge({
    conditionNames: ['web', '...'],
  });

  return webpackConfig;
};
