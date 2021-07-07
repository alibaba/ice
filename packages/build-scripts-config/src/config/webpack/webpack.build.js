const TerserPlugin = require('@builder/pack/deps/terser-webpack-plugin');
const CssMinimizerPlugin = require('@builder/pack/deps/css-minimizer-webpack-plugin');
const safeParser = require('@builder/pack/deps/postcss-safe-parser');

module.exports = (config) => {
  // disable devtool of mode prod build
  config.devtool(false);

  // uglify js file
  config.optimization
    .minimizer('TerserPlugin')
      .use(TerserPlugin, [{
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
    .minimizer('CssMinimizerPlugin')
      .use(CssMinimizerPlugin, [{
        parallel: false,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
          processorOptions: {
            parser: safeParser,
          },
        },
      }]);
};