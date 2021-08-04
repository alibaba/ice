module.exports = (config, options, context, { log }) => {
  const { command } = context;
  if (command === 'build' && options) {
    if (config.optimization.minimizers.has('ESBuild')) {
      config.optimization.minimizer('ESBuild').tap(([buildOptions]) => [{
        ...buildOptions,
        ...options,
      }]);
    } else {
      log.info('set minify to "esbuild" to enable esbuild options for minification');
    }
  }
};
