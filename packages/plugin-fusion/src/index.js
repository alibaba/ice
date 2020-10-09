const fs = require('fs');
const path = require('path');
const { upperFirst, camelCase } = require('lodash');
const WebpackPluginImport = require('webpack-plugin-import');
const CheckIceComponentsDepsPlugin = require('./webpackPlugins/checkIceComponentsDepPlugin');
const AppendStyleWebpackPlugin = require('./webpackPlugins/appendStyleWebpackPlugin');
const getThemeVars = require('./utils/getThemeVars');
const getThemeCode = require('./utils/getThemeCode');
const getCalcVars = require('./utils/getCalcVars');

function normalizeEntry(entry, preparedChunks) {
  const preparedName = preparedChunks
    .filter((module) => {
      return typeof module.name !== 'undefined';
    })
    .map((module) => module.name);

  return Object.keys(entry).concat(preparedName);
}

module.exports = async ({ onGetWebpackConfig, log, context }, plugionOptions = {}) => {
  const { themePackage, themeConfig, nextLibDir = 'es', usePx2Vw = false, px2vwOptions = {}, style = true, uniteNextLib, externalNext, importOptions = {} } = plugionOptions;
  let { uniteBaseComponent } = plugionOptions;
  const { rootDir, pkg, userConfig, webpack } = context;

  onGetWebpackConfig((config) => {
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
      let varsPath = path.join(rootDir, 'node_modules', '@alifd/next/variables.scss');
      if (!fs.existsSync(varsPath)) {
        varsPath = false;
      }
      // get scss variables and generate css variables
      themePackage.forEach(({ name, ...themeData }) => {
        const themePath = path.join(rootDir, 'node_modules', `${name}/variables.scss`);
        const configData = themeData.themeConfig || {};
        let themeVars = {};
        let calcVars = {};
        if (varsPath) {
          calcVars = getCalcVars(varsPath, themePath, configData);
        }
        try {
          themeVars = getThemeVars(themePath, Object.assign({}, calcVars, configData ));
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
          config.entry(name).prepend(jsPath);
        });
      } catch (err) {
        log.error('fail to add theme.js to entry');
        log.error(err);
      }
    }

    const themeFile = typeof themePackage === 'string' && path.join(rootDir, 'node_modules', `${themePackage}/variables.scss`);

    ['scss', 'scss-module'].forEach((rule) => {
      if (usePx2Vw) {
        config.module
          .rule(rule)
          .use('postcss-loader')
          .tap((options) => {
            const { plugins = [] } = options;
            return {
              ...options,
              plugins: [
                ...plugins,
                // eslint-disable-next-line
                require('./postcssPlugins/postcssPluginPx2vw')(px2vwOptions),
              ],
            };
          });
      }

      config.module
        .rule(rule)
        .use('ice-skin-loader')
        .loader(require.resolve('ice-skin-loader'))
        .options({
          themeFile,
          themeConfig: Object.assign(
            {},
            defaultScssVars,
            replaceVars,
            themeConfig || {}
          ),
        });
    });

    // check icons.scss
    const iconPackage = defaultTheme || themePackage;
    const iconScssPath = iconPackage && path.join(rootDir, 'node_modules', `${iconPackage}/icons.scss`);
    if (iconScssPath && fs.existsSync(iconScssPath)) {
      const appendStylePluginOption = {
        type: 'sass',
        srcFile: iconScssPath,
        variableFile: path.join(rootDir, 'node_modules', `${iconPackage}/variables.scss`),
        compileThemeIcon: true,
        themeConfig: themeConfig || {},
        distMatch: (chunkName, compilerEntry, compilationPreparedChunks) => {
          const entriesAndPreparedChunkNames = normalizeEntry(
            compilerEntry,
            compilationPreparedChunks,
          );
          // 仅对 css 的 chunk 做 处理
          if (entriesAndPreparedChunkNames.length && /\.css$/.test(chunkName)) {
            // css/index.css -> index css/index.[hash].css -> index
            // css/_component_.usage.css -> _component_.usage
            const assetsBaseName = path.basename(chunkName, path.extname(chunkName));
            const assetsFromEntry = userConfig.hash
              ? assetsBaseName.substring(0, assetsBaseName.lastIndexOf('.'))
              : assetsBaseName;
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
    // remove babel-plugin-import if external next
    if (!externalNext) {
      const importConfigs = [{
        libraryName: '@icedesign/base',
        style,
      }, {
        libraryName: '@alife/next',
        style,
      }, {
        libraryName: '@alifd/next',
        libraryDirectory: nextLibDir,
        style,
        ...importOptions,
      }];
      ['jsx', 'tsx'].forEach((rule) => {
        config.module
          .rule(rule)
          .use('babel-loader')
          .tap((options) => {
            const plugins = options.plugins.concat(
              importConfigs.map((itemConfig) => {
                return [require.resolve('babel-plugin-import'), itemConfig, itemConfig.libraryName];
              }),
            );
            options.plugins = plugins;
            return options;
          });
      });
    }

    // 业务组件：不可枚举，使用 webpack-plugin-import，内置逻辑（pkg.componentConfig || pkg.stylePath）
    // compatible with build-plugin which do not set up WebpackPluginImport
    if (!config.plugins.get('WebpackPluginImport')) {
      config.plugin('WebpackPluginImport')
        .use(WebpackPluginImport, [[
          // 老的业务组件里没有 stylePath or componentConfig
          {
            libraryName: /@ali\/ice-.*/,
            stylePath: 'style.js',
          },
        ]]);
    }

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
        pkg,
        log,
      }]);
    
    if (uniteNextLib) {
      const replaceRegex = new RegExp(`(alife|alifd)/next/${nextLibDir === 'es' ? 'lib' : 'es'}`);
      config.plugin('UniteNextLib')
        .use(webpack.NormalModuleReplacementPlugin, [
          /@(alife|alifd)\/next\/(.*)/,
          function(resource) {
            // eslint-disable-next-line no-param-reassign
            resource.request = resource.request.replace(replaceRegex, `alifd/next/${nextLibDir}`);
          },
        ]);
    }

    if (externalNext) {
      const externals = [];
      if (userConfig.externals) {
        externals.push(userConfig.externals);
      }
      const nextRegex = /@(alife|alifd)\/next\/(es|lib)\/([-\w+]+)$/;
      const baseRegex = /@icedesign\/base\/lib\/([-\w+]+)$/;
      externals.push(function(_context, request, callback) {
        const isNext = nextRegex.test(request);
        const isDesignBase = baseRegex.test(request);
        if (isNext || isDesignBase) {
          const componentName = isNext ? request.match(nextRegex)[3] : request.match(baseRegex)[1];
          if (componentName) {
            return callback(null, [isNext ? 'Next' : 'ICEDesignBase', upperFirst(camelCase(componentName))]);
          }
        }
        return callback();
      });
      config.externals(externals);
    }
    // 转化 icon content
    config.module.rule('scss').use('unicode-loader').loader(require.resolve('./webpackLoaders/unicodeLoader')).before('sass-loader');
  });
};
