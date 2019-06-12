const fs = require('fs');
const path = require('path');
const WebpackPluginImport = require('webpack-plugin-import');
const CheckIceComponentsDepsPlugin = require('./checkIceComponentsDepPlugin');
const getThemeVars = require('./getThemeVars');
const getThemeCode = require('./getThemeCode');

module.exports = async ({ chainWebpack, log, context }, plugionOptions) => {
  plugionOptions = plugionOptions || {};
  const { themePackage, themeConfig, themePackages } = plugionOptions;
  let { uniteBaseComponent } = plugionOptions;
  const { rootDir } = context;

  chainWebpack((config) => {
    // 1. 支持主题能力
    if (themePackage) {
      if (themePackages) {
        log.warn('已启用 themePackages 多主题功能，themePackge 设置将失效');
      } else {
        log.info('使用 Fusion 组件主题包：', themePackage);
      }
    }
    if (themeConfig) {
      log.info('自定义 Fusion 组件主题变量：', themeConfig);
    }

    let replaceVars = {};
    if (themePackages) {
      const themesCssVars = {};
      let defaultTheme = '';
      // get scss variables and generate css variables
      themePackages.forEach(({ name, ...themeData }) => {
        const themePath = path.join(rootDir, 'node_modules', `${name}/variables.js`);
        let themeVars = {};
        try {
          themeVars = getThemeVars(themePath, themeData.themeConfig || {});
        } catch (e) {
          log.error(`can not find ${themePath}`);
        }
        replaceVars = themeVars.scssVars;
        themesCssVars[name] = themeVars.cssVars;
        if (themeData.default) {
          defaultTheme = name;
        }
      });
      try {
        const tempDir = path.join(rootDir, './node_modules');
        const jsPath = path.join(tempDir, 'change-theme.js');
        fs.writeFileSync(jsPath, getThemeCode(themesCssVars, defaultTheme));

        // add theme.js to entry
        const entryNames = Object.keys(config.entryPoints.entries());
        entryNames.forEach((name) => {
          config.entry(name).add(jsPath);
        });
      } catch (e) {
        log.error('fail to add theme.js to entry');
        log.error(e);
      }
    }

    ['scss', 'scss-module'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('ice-skin-loader')
        .loader(require.resolve('ice-skin-loader'))
        .options({
          themeFile: !themePackages && themePackage && path.join(rootDir, 'node_modules', `${themePackage}/variables.scss`),
          themeConfig: Object.assign(replaceVars, themeConfig || {}),
        });
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
      libraryDirectory: 'es',
      style: true,
    }];
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          options.plugins = options.plugins.concat(
            importConfigs.map((itemConfig) => {
              return [require.resolve('babel-plugin-import'), itemConfig, itemConfig.libraryName];
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
      log.info('uniteBaseComponent 开启，基础包统一到：', uniteBaseComponent);

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

    // 4. 检测组件版本
    config.plugin('CheckIceComponentsDepsPlugin')
      .use(CheckIceComponentsDepsPlugin, [{
        pkg: context.pkg,
        log,
      }]);
  });
};
