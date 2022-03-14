module.exports = (config, cssLoaderOptions) => {
  if (cssLoaderOptions) {
    const {modules, ...restOptions} = cssLoaderOptions;

    [
      'scss',
      'scss-module',
      'scss-global',
      'css',
      'css-module',
      'css-global',
      'less',
      'less-module',
      'less-global',
    ].forEach(rule => {
      if (config.module.rules.get(rule)) {
        const isCSSModule = /-module$/.test(rule);

        config.module
          .rule(rule)
          .use('css-loader')
          .tap((options) => ({
            ...options,
            ...(isCSSModule ? cssLoaderOptions : restOptions),
          }));
      }
    });
  }
};
