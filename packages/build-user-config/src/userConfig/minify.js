const {
  ESBuildMinifyPlugin
} = require('@builder/pack/deps/esbuild-loader');
const { SWCMinifyPlugin } = require('@builder/webpack-plugin-swc');
const TerserPlugin = require('@builder/pack/deps/terser-webpack-plugin');

let logged = false;

const TERSER_DEFAULT_OPTIONS = {
  parallel: true,
  extractComments: false,
  terserOptions: {
    output: {
      ascii_only: true,
      comments: 'some',
      beautify: false,
    },
    mangle: true,
  },
};

module.exports = (config, minify, context, { log }) => {
  const { command, taskName } = context;
  // When minify is true, all tasks need be minified
  const includedInMinifyTasks = minify === true || (minify.activeInDev || []).includes(taskName);
  if ( minify && (command === 'build' || includedInMinifyTasks)) {
    const minifierConfig = minify.type ? minify : { type: typeof minify === 'boolean' ? 'terser' : minify };
    const { type, options } = minifierConfig;
    const availableMinifier = ['terser', 'esbuild', 'swc'];
    if (!availableMinifier.includes(type)) {
      if (!logged) {
        logged = true;
        log.info(`invalid minify value ${type}, available minifier is 'terser | esbuild'`);
      }
      return;
    }
    // Enable minimize for development, in production its default value is true
    config.optimization.minimize(true);
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
    } else {
      if (!config.optimization.minimizers.has('TerserPlugin')) {
        config.optimization
          .minimizer('TerserPlugin')
          .use(TerserPlugin, [TERSER_DEFAULT_OPTIONS]);
      }
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
