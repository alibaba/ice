const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (config, value, context) => {
  const { command, webpack } = context;
  if (command === 'start' && value && process.env.NODE_ENV !== 'test') {
    config.plugin('ReactRefreshWebpackPlugin')
      .use(ReactRefreshWebpackPlugin, [{
        overlay: false,
      }]);
    config.plugin('HotModuleReplacementPlugin')
      .use(webpack.HotModuleReplacementPlugin);
    // add babel plugin for react-refresh
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
                require.resolve('react-refresh/babel')
              ],
            };
        });
    });
  }
};
