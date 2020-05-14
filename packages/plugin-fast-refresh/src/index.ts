import * as ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

interface IPluginOptions {
  reactRefresh: boolean;
}

export default async function (api, pluginOptions: IPluginOptions) {
  const { onGetWebpackConfig, registerUserConfig } = api;

  registerUserConfig({
    name: 'reactRefresh',
    validation: 'boolean',
  });

  onGetWebpackConfig((config) => {
    const isDevelopment = process.env.NODE_ENV === 'development';

    // DO NOT apply the plugin in production mode!
    if (isDevelopment && pluginOptions && pluginOptions.reactRefresh) {
      config.plugin('ReactRefreshWebpackPlugin')
        .use(new ReactRefreshWebpackPlugin());

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
