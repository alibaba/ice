process.env.NODE_ENV = 'production';

const webpackMerge = require('webpack-merge');

const getWebpackConfigBasic = require('./webpack.config.basic');

module.exports = function getWebpackConfigDev(entry, paths, options = {}) {
  const baseConfig = getWebpackConfigBasic(entry, paths, options);

  return webpackMerge(baseConfig, {
    devtool: 'none',
  });
};
