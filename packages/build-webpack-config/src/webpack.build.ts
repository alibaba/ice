import * as TerserPlugin from '@builder/pack/deps/terser-webpack-plugin';
import * as CssMinimizerPlugin from '@builder/pack/deps/css-minimizer-webpack-plugin';
import * as safeParser from '@builder/pack/deps/postcss-safe-parser';

export default (config) => {
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
