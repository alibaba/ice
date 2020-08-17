const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safeParser = require('postcss-safe-parser');

module.exports = (config) => {
  // disable devtool of mode prod build
  config.devtool(false);

  // uglify js file
  config.optimization
    .minimizer('TerserPlugin')
      .use(TerserPlugin, [{
        sourceMap: false,
        cache: true,
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            unused: false,
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
  config.optimization
    .minimizer('OptimizeCSSAssetsPlugin')
      .use(OptimizeCSSAssetsPlugin, [{
        cssProcessorOptions: {
          cssDeclarationSorter: false,
          reduceIdents: false,
          parser: safeParser,
        },
      }]);
};
