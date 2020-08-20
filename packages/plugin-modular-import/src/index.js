module.exports = async ({ onGetWebpackConfig }, pluginOptions = []) => {
  onGetWebpackConfig((config) => {
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          pluginOptions.forEach((item = {}) => {
            options.plugins.push(
              [
                require.resolve('babel-plugin-import'),
                item,
                item.libraryName,
              ],
            );
          });
          return options;
        });
    });
  });
};
