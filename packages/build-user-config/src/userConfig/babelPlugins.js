module.exports = (config, babelPlugins, { userConfig }) => {
  if (userConfig.swc) return;
  ['jsx', 'tsx'].forEach((rule) => {
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
