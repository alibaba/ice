const webpackMerge = require('webpack-merge');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const getWebpackConfigBasic = require('./webpack.config.basic');

module.exports = function getWebpackConfigDev(entry, paths, options = {}) {
  const baseConfig = getWebpackConfigBasic(entry, paths, options);

  return webpackMerge(baseConfig, {
    devtool: 'cheap-module-source-map',
    output: {
      publicPath: '/build/',
    },
    plugins: [
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new BundleAnalyzerPlugin({
        analyzerPort: 49123,
        // http://127.0.0.1:49123/report.html
      }),
    ],
  });
};
