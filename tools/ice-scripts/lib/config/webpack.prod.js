/* eslint-disable indent */
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const getBaseCofing = require('./webpack.base.js');

module.exports = () => {
  const baseConfig = getBaseCofing('production');
  baseConfig.devtool(false);

  // uglify js file
  baseConfig.optimization
    .minimizer('UglifyJsPlugin')
      .use(UglifyJsPlugin, [{
        sourceMap: false,
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
      }]);

  // optimize css file
  baseConfig.optimization
    .minimizer('OptimizeCSSAssetsPlugin')
      .use(OptimizeCSSAssetsPlugin, [{
          cssProcessorOptions: {
            cssDeclarationSorter: false,
            reduceIdents: false,
            parser: require('postcss-safe-parser'),
          },
      }]);

  return baseConfig;
};
