module.exports = async ({ onGetWebpackConfig, log, context, modifyUserConfig }, pluginOptions = {}) => {
  const { themeConfig = {}, importOptions = {}, disableModularImport = false } = pluginOptions;
  const { userConfig } = context;

  if (userConfig.vite) {
    modifyUserConfig('vite', {
      plugins: [
        !disableModularImport &&
          // eslint-disable-next-line global-require
          require('vite-plugin-style-import').default({
            libs: [{
              libraryName: 'antd',
              esModule: true,
              resolveStyle: (name) => {
                return `antd/es/${name}/style/index`;
              },
            }]
          }),
      ].filter(Boolean),
    }, { deepmerge: true });
  }

  onGetWebpackConfig((config) => {
    // support less modify vars
    if (themeConfig) {
      log.info('自定义 antd 组件主题变量：', themeConfig);
    }
    ['less', 'less-module'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('less-loader')
        .tap((options) => {
          if (options.lessOptions) {
            return {
              ...options, lessOptions: {
                ...(options.lessOptions || {}),
                modifyVars: {
                  ...(options.lessOptions.modifyVars || {}),
                  ...themeConfig,
                },
              }
            };
          }
          // compatible with old less version
          return {
            ...options,
            modifyVars: {
              ...options.modifyVars,
              ...themeConfig,
            },
          };
        });
    });
    if (!disableModularImport) {
      // add babel-plugin-import for antd
      const defaultOptions = {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      };
      ['jsx', 'tsx'].forEach((rule) => {
        config.module
          .rule(rule)
          .use('babel-loader')
          .tap((options) => {
            options.plugins.push(
              [
                require.resolve('babel-plugin-import'),
                {
                  ...defaultOptions,
                  ...importOptions,
                },
                'antd',
              ],
            );
            return options;
          });
      });
    }
  });
};
