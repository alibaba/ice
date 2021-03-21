module.exports = (config, options) => {
  if (options) {
    if(config.optimization.minimizers.has('TerserPlugin')) {
      config.optimization.minimizers.delete('TerserPlugin');
    }
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .tap((options) => ({
          ...options,
          minify: true
        }));
    });
  }
};
