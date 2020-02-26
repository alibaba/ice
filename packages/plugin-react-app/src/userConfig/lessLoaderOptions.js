module.exports = (config, lessLoaderOptions) => {
  if (lessLoaderOptions) {
    [
      'less',
      'less-module',
    ].forEach(rule => {
      if (config.module.rules.get(rule)) {
        config.module
          .rule(rule)
          .use('less-loader')
          .tap((options) => ({
            ...options,
            ...lessLoaderOptions,
          }));
      }
    });
  }
};