const webpackMerge = require('webpack-merge');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const webpack = require('webpack');
const getWebpackConfigBasic = require('./webpack.config.basic');

module.exports = function getWebpackConfigDev(entry, paths, options = {}) {
  const baseConfig = getWebpackConfigBasic(entry, paths, options);

  return webpackMerge(baseConfig, {
    devtool: 'cheap-module-source-map',
    output: {
      publicPath: '/dist/',
    },
    plugins: [
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
  });
};
