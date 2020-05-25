import * as ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export default async function (api) {
  const { onGetWebpackConfig } = api;

  onGetWebpackConfig((config) => {
    const isDevelopment = process.env.NODE_ENV === 'development';

    // DO NOT apply the plugin in production mode!
    if (isDevelopment) {
      config.plugin('ReactRefreshWebpackPlugin')
        .use(new ReactRefreshWebpackPlugin({
          overlay: false
        }));

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
  });
};
