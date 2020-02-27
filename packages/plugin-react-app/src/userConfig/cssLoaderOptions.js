module.exports = (config, cssLoaderOptions) => {
  if (cssLoaderOptions) {
    [
      'scss',
      'scss-module',
      'css',
      'css-module',
      'less',
      'less-module',
    ].forEach(rule => {
      if (config.module.rules.get(rule)) {
        config.module
          .rule(rule)
          .use('css-loader')
          .tap((options) => ({
            ...options,
            ...cssLoaderOptions,
          }));
      }
    });
  }
};