module.exports = async ({ chainWebpack, log }, pluginOptions) => {
  const { themeConfig } = pluginOptions || {};
  chainWebpack((config) => {
    // 1. 支持主题能力
    if (themeConfig) {
      log.info('自定义 Antd 组件主题变量：', themeConfig);
    }
    ['less', 'less-module'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('less-loader')
        .tap((options) => {
          options.modifyVars = {
            ...options.modifyVars,
            ...themeConfig,
          };
          return options;
        });
    });

    // 2. 组件（包含业务组件）按需加载&样式自动引入
    // babel-plugin-import: 基础组件
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          options.plugins.push(
            [
              'babel-plugin-import',
              {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
              },
              'antd',
            ]
          );
          return options;
        });
    });
  });
};
