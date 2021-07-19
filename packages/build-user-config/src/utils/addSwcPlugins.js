module.exports = (config, swcPlugins) => {
  config.module
    .rule('jsx')
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
};
