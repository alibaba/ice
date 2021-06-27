module.exports = (config, swcPlugins) => {
  ['jsx', 'ts', 'tsx'].forEach((rule) => {
    config.module
      .rule(rule)
      .use('swc-loader')
      .tap((options) => {
        const { plugins = [] } = options;
        return {
          ...options,
          plugins: [
            ...plugins,
            ...swcPlugins,
          ],
        };
      });
  });
};
