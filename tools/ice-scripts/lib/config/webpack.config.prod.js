process.env.NODE_ENV = 'production';

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackMerge = require('webpack-merge');

const getWebpackConfigBasic = require('./webpack.config.basic');

module.exports = function getWebpackConfigDev(entry, paths, options = {}) {
  const baseConfig = getWebpackConfigBasic(entry, paths, options);

  return webpackMerge(baseConfig, {
    devtool: 'none',
    optimization: {
      minimize: !process.env.BUILD_DEBUG,
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: {
              unused: false,
              warnings: false,
            },
            output: {
              ascii_only: true,
              comments: 'some',
              beautify: false,
            },
            mangle: true,
          },
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
  });
};
