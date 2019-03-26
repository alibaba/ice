const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackMerge = require('webpack-merge');

const getWebpackConfigBasic = require('./webpack.config.basic');
const cliInstance = require('../utils/cliInstance');
const log = require('../utils/log');

module.exports = function getWebpackConfigProd({ entry, buildConfig }) {
  const baseConfig = getWebpackConfigBasic({ entry, buildConfig });
  const sourcemap = cliInstance.get('sourcemap');

  log.info('cli options sourcemap', sourcemap);

  return webpackMerge(baseConfig, {
    devtool: sourcemap || 'none',
    optimization: {
      minimize: !cliInstance.get('debug'),
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: sourcemap && sourcemap !== 'none',
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
