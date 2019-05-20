const path = require('path');
const WebpackPluginImport = require('webpack-plugin-import');

module.exports = async (api, { themePackage, themeConfig = {}, uniteBaseComponent }) => {
  api.chainWebpack((config) => {
    // 1. 支持主题能力
    if (themePackage) {
      api.log.info('使用 Fusion 组件主题包：', themePackage);
    }
    if (themeConfig) {
      api.log.info('自定义 Fusion 组件主题变量：', themeConfig);
    }
    config.module
      .rule('scss')
      .use('ice-skin-loader')
      .loader(require.resolve('ice-skin-loader'))
      .options({
        themeFile: themePackage && path.join(api.service.paths.appNodeModules, `${themePackage}/variables.scss`),
        themeConfig,
      });

    // 2. 组件（包含业务组件）按需加载&样式自动引入
    // babel-plugin-import: 基础组件
    const importConfigs = [{
      libraryName: '@icedesign/base',
      style: true,
    }, {
      libraryName: '@alife/next',
      style: true,
    }, {
      libraryName: '@alifd/next',
      style: true,
    }];
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          options.plugins = options.plugins.concat(
            importConfigs.map((itemConfig) => {
              return ['babel-plugin-import', itemConfig, itemConfig.libraryName];
            })
          );
          return options;
        });
    });

    // 业务组件：不可枚举，使用 webpack-plugin-import，内置逻辑（pkg.componentConfig || pkg.stylePath）
    config
      .plugin('WebpackPluginImport')
      .use(WebpackPluginImport, [[
        // 老的业务组件里没有 stylePath or componentConfig
        {
          libraryName: /@ali\/ice-.*/,
          stylePath: 'style.js',
        },
      ]]);

    // 3. uniteBaseComponent
    // uniteBaseComponent: true => @icedesign/base（兼容老的逻辑）
    // uniteBaseComponent: "@alife/next" => @alife/next
    uniteBaseComponent = uniteBaseComponent && (
      typeof uniteBaseComponent === 'string' ? uniteBaseComponent : '@icedesign/base'
    );

    if (uniteBaseComponent) {
      // 统一基础组件包：@ali/ice, @alife/next, @icedesign/base -> @icedesign/base
      api.log.info('uniteBaseComponent 开启，基础包统一到：', uniteBaseComponent);

      const alias = {
        // @ali/ice -> uniteBaseComponent
        '@ali/ice/global.scss': `${uniteBaseComponent}/reset.scss`,
        '@ali/ice/lib/row$': `${uniteBaseComponent}/lib/_components/@alife/next-grid/lib/row.js`,
        '@ali/ice/lib/col$': `${uniteBaseComponent}/lib/_components/@alife/next-grid/lib/col.js`,
        // sass 里 @import '~xxx'
        '@ali/ice/base.scss': `${uniteBaseComponent}/lib/core/index.scss`,
        '@ali/ice': uniteBaseComponent,

        // @alife/next -> uniteBaseComponent
        '@alife/next/lib/_components/@alife/next-core/lib/index.scss': `${uniteBaseComponent}/reset.scss`,
        '@alife/next/reset.scss': `${uniteBaseComponent}/reset.scss`,
        // sass 里 @import '~xxx'
        '@alife/next/variables.scss': `${uniteBaseComponent}/variables.scss`,
        '@alife/next/lib/core/index.scss': `${uniteBaseComponent}/lib/core/index.scss`,
        '@alife/next': `${uniteBaseComponent}`,

        // @icedesign/base -> uniteBaseComponent
        '@icedesign/base/reset.scss': `${uniteBaseComponent}/reset.scss`,
        // sass 里 @import '~xxx'
        '@icedesign/base/variables.scss': `${uniteBaseComponent}/variables.scss`,
        '@icedesign/base/lib/core/index.scss': `${uniteBaseComponent}/lib/core/index.scss`,
        '@icedesign/base': `${uniteBaseComponent}`,
      };

      config.merge({
        resolve: {
          alias,
        },
      });
    }
  });
};
