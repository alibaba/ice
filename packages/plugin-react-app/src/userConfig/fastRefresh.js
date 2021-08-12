const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const deepmerge = require('deepmerge');

module.exports = (config, value, context) => {
  const { command, userConfig } = context;
  if (command === 'start' && value && process.env.NODE_ENV !== 'test') {
    config.plugin('ReactRefreshWebpackPlugin')
      .use(ReactRefreshWebpackPlugin, [{
        overlay: false,
      }]);
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
    if (userConfig.swc) {
      const refreshOptions = {
        jsc: {
          transform: {
            react: {
              refresh: true,
            },
          },
        },
      };
      config.module.rule('swc').use('swc-loader').tap((options) => deepmerge(options || {}, refreshOptions));
    }
  }
};
