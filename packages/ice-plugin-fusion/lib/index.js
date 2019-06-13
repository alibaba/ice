const fs = require('fs');
const path = require('path');
const WebpackPluginImport = require('webpack-plugin-import');
const CheckIceComponentsDepsPlugin = require('./webpackPlugins/checkIceComponentsDepPlugin');
const AppendStyleWebpackPlugin = require('./webpackPlugins/appendStyleWebpackPlugin');
const getThemeVars = require('./getThemeVars');
const getThemeCode = require('./getThemeCode');

function normalizeEntry(entry, preparedChunks) {
  const preparedName = preparedChunks
    .filter((module) => {
      return typeof module.name !== 'undefined';
    })
    .map((module) => module.name);

  return Object.keys(entry).concat(preparedName);
}

module.exports = async ({ chainWebpack, log, context }, plugionOptions) => {
  plugionOptions = plugionOptions || {};
  const { themePackage, themeConfig } = plugionOptions;
  let { uniteBaseComponent } = plugionOptions;
  const { rootDir, pkg } = context;

  chainWebpack((config) => {
    // 1. 支持主题能力
    if (themePackage) {
      if (Array.isArray(themePackage)) {
        log.info('已启用 themePackage 多主题功能');
      } else {
        log.info('使用 Fusion 组件主题包：', themePackage);
      }
    }
    if (themeConfig) {
      log.info('自定义 Fusion 组件主题变量：', themeConfig);
    }

    let replaceVars = {};
    let defaultScssVars = {};
    let defaultTheme = '';
    if (Array.isArray(themePackage)) {
      const themesCssVars = {};
      // get scss variables and generate css variables
      themePackage.forEach(({ name, ...themeData }) => {
        const themePath = path.join(rootDir, 'node_modules', `${name}/variables.scss`);
        let themeVars = {};
        try {
          themeVars = getThemeVars(themePath, themeData.themeConfig || {});
        } catch (err) {
          log.error('get theme variables err:', err);
        }
        replaceVars = themeVars.scssVars;
        defaultScssVars = themeVars.originTheme;
        themesCssVars[name] = themeVars.cssVars;
        if (themeData.default) {
          defaultTheme = name;
        }
      });

      defaultTheme = defaultTheme || (themePackage[0] && themePackage[0].name);

      try {
        const tempDir = path.join(rootDir, './node_modules');
        const jsPath = path.join(tempDir, 'change-theme.js');
        fs.writeFileSync(jsPath, getThemeCode(themesCssVars, defaultTheme));

        // add theme.js to entry
        const entryNames = Object.keys(config.entryPoints.entries());
        entryNames.forEach((name) => {
          config.entry(name).add(jsPath);
        });
      } catch (err) {
        log.error('fail to add theme.js to entry');
        log.error(err);
      }
    }

    const themeFile = typeof themePackage === 'string' && path.join(rootDir, 'node_modules', `${themePackage}/variables.scss`);

    ['scss', 'scss-module'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('ice-skin-loader')
        .loader(require.resolve('ice-skin-loader'))
        .options({
          themeFile,
          themeConfig: Object.assign({}, defaultScssVars, replaceVars, themeConfig || {}),
        });
    });

    // check icons.scss
    const iconPackage = defaultTheme || themePackage;
    const iconScssPath = iconPackage && path.join(rootDir, 'node_modules', `${iconPackage}/icons.scss`);
    if (iconScssPath && fs.existsSync(iconScssPath)) {
      const appendStylePluginOption = {
        type: 'sass',
        srcFile: iconScssPath,
        variableFile: themeFile,
        compileThemeIcon: true,
        themeNextVersion: (/^@alif(e|d)\/theme-/.test(themePackage) || themePackage === '@icedesign/theme') ? '1.x' : '0.x',
        pkg,
        distMatch: (chunkName, compilerEntry, compilationPreparedChunks) => {
          const entriesAndPreparedChunkNames = normalizeEntry(
            compilerEntry,
            compilationPreparedChunks
          );
          // 仅对 css 的 chunk 做 处理
          if (entriesAndPreparedChunkNames.length && /\.css$/.test(chunkName)) {
            // css/index.css -> index css/index.[hash].css -> index
            const assetsFromEntry = path.basename(chunkName, path.extname(chunkName)).split('.')[0];
            if (entriesAndPreparedChunkNames.indexOf(assetsFromEntry) !== -1) {
              return true;
            }
          }
          return false;
        },
      };
      config.plugin('AppendStyleWebpackPlugin').use(AppendStyleWebpackPlugin, [appendStylePluginOption]);
    }

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
