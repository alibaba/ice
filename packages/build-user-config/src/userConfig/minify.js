const {
  ESBuildMinifyPlugin
} = require('@builder/pack/deps/esbuild-loader');
const { SWCMinifyPlugin } = require('swc-webpack-plugin');

module.exports = (config, minify, context, { log }) => {
  const { command } = context;
  if ( minify && command === 'build') {
    const minificationConfig = minify.type ? minify : { type: minify };
    const { type, options } = minificationConfig;
    const availableMinifier = ['terser', 'esbuild', 'swc'];
    if (!availableMinifier.includes(type)) {
      log.info(`invalid minify value ${type}, available minifier is 'terser | esbuild'`);
      return;
    }
    if (['swc', 'esbuild'].includes(type) && config.optimization.minimizers.has('TerserPlugin')) {
      config.optimization.minimizers.delete('TerserPlugin');
    }
    // The default is terser which is configured in base chain
    if (type === 'esbuild') {
      log.info('esbuild is specified as default minification');
      const esbuildMinifyOptions = Object.assign({
        target: 'es2015',
      }, options);
      config.optimization.minimizer('ESBuild').use(ESBuildMinifyPlugin, [esbuildMinifyOptions]);
    } else if (type === 'swc') {
      log.info('swc is specified as default minification');
      const jscCompileOptions = {
        jsc: {
          minify: Object.assign({
            compress: {
              unused: false,
            },
            mangle: true,
          }, options),
          target: 'es2021',
        },
        sync: false,
      };
      config.optimization.minimizer('SWC').use(SWCMinifyPlugin, [jscCompileOptions]);
    } else if (config.optimization.minimizers.get('TerserPlugin')) {
      // fallback to terser as default minification
      config.optimization.minimizer('TerserPlugin').tap(([terserPluginOptions]) => {
        return [{
          ...terserPluginOptions,
          terserOptions: Object.assign(terserPluginOptions.terserOptions || {}, options),
        }];
      });
    }
  } else if (!minify) {
    config.optimization.minimize(false);
  }
};
