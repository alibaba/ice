module.exports = (config, sassLoaderOptions) => {
  if (sassLoaderOptions) {
    [
      'scss',
      'scss-module',
    ].forEach(rule => {
      if (config.module.rules.get(rule)) {
        config.module
          .rule(rule)
          .use('sass-loader')
          .tap((options) => ({
            ...options,
            ...sassLoaderOptions,
          }));
      }
    });
  }
};