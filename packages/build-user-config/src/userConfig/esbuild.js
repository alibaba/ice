const {
  ESBuildMinifyPlugin
} = require('esbuild-loader');

const defaultOptions = {
  target: 'es2015',
};

module.exports = (config, options, context, { log }) => {
  if (options) {
    log.info('Enabled EsBuild');
    if(config.optimization.minimizers.has('TerserPlugin')) {
      config.optimization.minimizers.delete('TerserPlugin');
    }
    config.optimization.minimizer('ESBuild').use(ESBuildMinifyPlugin, [{
      ...defaultOptions,
      ...options,
    }]);
  }
};
