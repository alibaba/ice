const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackMerge = require('webpack-merge');

const getWebpackConfigBasic = require('./webpack.config.basic');

module.exports = function getWebpackConfigProd({ entry, buildConfig }) {
  const baseConfig = getWebpackConfigBasic({ entry, buildConfig });

  return webpackMerge(baseConfig, {
    devtool: 'none',
    optimization: {
      minimize: !process.env.DEBUG,
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
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            cssDeclarationSorter: false,
            reduceIdents: false,
            parser: require('postcss-safe-parser'),
          },
        }),
      ],
    },
  });
};
