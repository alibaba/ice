const {
  ESBuildMinifyPlugin
} = require('esbuild-loader');

const defaultOptions = {
  target: 'es5',
};

module.exports = (config, options) => {
  if (options) {
    if(config.optimization.minimizers.has('TerserPlugin')) {
      config.optimization.minimizers.delete('TerserPlugin');
    }
    config.optimization.minimizer('ESBuild').use(ESBuildMinifyPlugin, [{
      ...defaultOptions,
      ...options,
    }]);
  }
};
