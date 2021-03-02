module.exports = (config, babelPlugins) => {
  ['jsx', 'tsx'].forEach((rule) => {
    if (!config.module.rule(rule).has('babel-loader')) {
      return;
    }
    config.module
      .rule(rule)
      .use('babel-loader')
      .tap((options) => {
        const { plugins = [] } = options;
        return {
          ...options,
          plugins: [
            ...plugins,
            ...babelPlugins,
          ],
        };
      });
  });
};
