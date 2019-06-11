module.exports = async ({ chainWebpack }, pluginOptions = []) => {
  chainWebpack((config) => {
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          pluginOptions.forEach((item = {}) => {
            options.plugins.push(
              [
                'babel-plugin-import',
                item,
                item.libraryName,
              ]
            );
          });
          return options;
        });
    });
  });
};
