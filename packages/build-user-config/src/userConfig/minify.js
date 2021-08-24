const {
  ESBuildMinifyPlugin
} = require('@builder/pack/deps/esbuild-loader');
const { SWCMinifyPlugin } = require('swc-webpack-plugin');

module.exports = (config, value, context, { log }) => {
  const { command } = context;
  if (typeof value === 'string' && command === 'build') {
    const availableMinifier = ['terser', 'esbuild', 'swc'];
    if (!availableMinifier.includes(value)) {
      log.info(`invalid minify value ${value}, available minifier is 'terser | esbuild'`);
      return;
    }
    // The default is terser which is configured in base chain
    if (value === 'esbuild') {
      log.info('esbuild is specified as default minification');
      const defaultOptions = {
        target: 'es2015',
      };
      if(config.optimization.minimizers.has('TerserPlugin')) {
        config.optimization.minimizers.delete('TerserPlugin');
      }
      config.optimization.minimizer('ESBuild').use(ESBuildMinifyPlugin, [defaultOptions]);
    }
    if (value === 'swc') {
      log.info('swc is specified as default minification');
      const defaultOptions = {
        jsc: {
          minify: {
            compress: {
              unused: false,
            },
            mangle: true,
          },
          target: 'es2021',
        },
        sync: false,
      };
      if(config.optimization.minimizers.has('TerserPlugin')) {
        config.optimization.minimizers.delete('TerserPlugin');
      }
      config.optimization.minimizer('SWC').use(SWCMinifyPlugin, [defaultOptions]);
    }
  } else if (!value) {
    config.optimization.minimize(false);
  }
};
