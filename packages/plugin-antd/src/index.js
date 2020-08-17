module.exports = async ({ onGetWebpackConfig, log }, pluginOptions = {}) => {
  const { themeConfig = {}, importOptions = {} } = pluginOptions;
  onGetWebpackConfig((config) => {
    // support less modify vars
    if (themeConfig) {
      log.info('自定义 Antd 组件主题变量：', themeConfig);
    }
    ['less', 'less-module'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('less-loader')
        .tap((options) => {
          const modifyVars = {
            ...options.modifyVars,
            ...themeConfig,
          };
          return { ...options, modifyVars };
        });
    });

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
  });
};
