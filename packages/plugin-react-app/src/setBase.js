const path = require('path');
const HtmlWebpackPlugin = require('@builder/pack/deps/html-webpack-plugin');
const CopyWebpackPlugin = require('@builder/pack/deps/copy-webpack-plugin');
const WebpackPluginImport = require('webpack-plugin-import');
const WebpackPluginQueryLoader = require('webpack-plugin-query-loader').default;
const { getFilePath, getWebOutputPath } = require('./utils');

module.exports = (api, { target, webpackConfig }) => {
  const { context, modifyUserConfig } = api;
  const { rootDir, userConfig } = context;
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
      .use(CopyWebpackPlugin, [{
        patterns: [
          {
            from: path.resolve(rootDir, 'public'),
            to: path.resolve(rootDir, outputPath),
            noErrorOnMissing: true,
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
      .use(WebpackPluginImport, [[
        {
          libraryName: /@ali\/ice-.*/,
          stylePath: 'style.js',
        },
      ]])
      .end();
  if (userConfig.queryLoader) {
    webpackConfig.plugin('WebpackPluginQueryLoader')
      .use(WebpackPluginQueryLoader);
  }
    
  // auto inject style.js of component (webpack-plugin-import) in mode vite
  if (userConfig.vite) {
    modifyUserConfig('vite.plugins', (vitePlugins) => {
      // eslint-disable-next-line global-require
      return [...(vitePlugins || []), require('vite-plugin-component-style').default()];
    });
  }

  webpackConfig.resolve.merge({
    conditionNames: ['web', 'import', 'require', 'node'],
  });

  return webpackConfig;
};
