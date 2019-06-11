module.exports = async ({ chainWebpack }, pluginOptions = {}) => {
  chainWebpack((config) => {
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          options.plugins.push(
            [
              'babel-plugin-import',
              pluginOptions,
              pluginOptions.libraryName,
            ]
          );
          return options;
        });
    });
  });
};
