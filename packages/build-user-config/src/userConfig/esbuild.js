const {
  ESBuildPlugin,
  ESBuildMinifyPlugin
} = require('esbuild-loader');

const defaultOptions = {
  target: 'es2015',
};
module.exports = (config, options) => {
  const { loaderOptions, minifyOptions } = options;
  if (options) {
    if (loaderOptions) {
      ['jsx', 'tsx'].forEach((rule) => {
        config.module.rule(rule).uses.delete('babel-loader').end()
        .use('esbuild-loader')
        .loader(require.resolve('esbuild-loader'))
        .options({
          loader: rule,
          ...defaultOptions,
          ...loaderOptions,
        });
      });
    }
    if (minifyOptions) {
      if(config.optimization.minimizers.has('TerserPlugin')) {
        config.optimization.minimizers.delete('TerserPlugin');
      }
      config.optimization.minimizer('ESBuild').use(ESBuildMinifyPlugin, [{
        ...defaultOptions,
        ...minifyOptions,
      }]);
    }
    if (loaderOptions || minifyOptions) {
      config.plugin('ESBuildPlugin').use(ESBuildPlugin);  
    }
  }
};
