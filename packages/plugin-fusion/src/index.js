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
  const preparedName = (preparedChunks || [])
    .filter((module) => {
      return typeof module.name !== 'undefined';
    })
    .map((module) => module.name);

  return Object.keys(entry).concat(preparedName);
}

function replaceBlank(str) {
  return str.replace(/[\r\n ]/g, '').replace(/\\/g, '\\\\');
}

function addCSSVariableCode({ rootDir, themesCssVars, defaultTheme, cssVariable, config, log }) {
  try {
    const tempDir = path.join(rootDir, './node_modules');
    const jsPath = path.join(tempDir, 'change-theme.js');
    fs.writeFileSync(jsPath, getThemeCode(themesCssVars, defaultTheme, cssVariable));

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

function getVariablesPath({
  packageName, filename = 'variables.scss', slient = false
}) {
  let filePath = '';
  const variables = `${packageName}/${filename}`;
  try {
    filePath = require.resolve(variables);
  } catch (err) {
    console.log(err);
    if (!slient) {
      console.log('[ERROR]', `fail to resolve ${variables}`);
    }
  }
  return filePath;
}

module.exports = async ({ onGetWebpackConfig, log, context, getAllTask }, plugionOptions = {}) => {
  const {
    themePackage,
    themeConfig,
    nextLibDir = 'es',
    usePx2Vw = false,
    px2vwOptions = {},
    style = true,
    uniteNextLib,
    externalNext,
    importOptions = {},
    componentOptions = {},
    enableColorNames,
    cssVariable,
  } = plugionOptions;
  let { uniteBaseComponent } = plugionOptions;
  const { rootDir, pkg, userConfig, webpack } = context;

  const taskNames = getAllTask();
  // ignore externals rule and babel-plugin-import when compile dist
  const ignoreTasks = ['component-dist'];
  taskNames.forEach((taskName) => {
    onGetWebpackConfig(taskName, (config) => {
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
        const varsPath = !cssVariable && getVariablesPath({ packageName: '@alifd/next', slient: true });
        // get scss variables and generate css variables
        themePackage.forEach(({ name, ...themeData }) => {
          const themePath = getVariablesPath({ packageName: name, filename: `variables.${cssVariable ? 'css' : 'scss'}` });
          if (!cssVariable) {
            const configData = themeData.themeConfig || {};
            let themeVars = {};
            let calcVars = {};
            if (varsPath) {
              calcVars = getCalcVars(varsPath, themePath, configData);
            }
            try {
              themeVars = getThemeVars(themePath, Object.assign({}, calcVars, configData ), enableColorNames);
            } catch (err) {
              log.error('get theme variables err:', err);
            }
            replaceVars = themeVars.scssVars;
            defaultScssVars = themeVars.originTheme;
            themesCssVars[name] = themeVars.cssVars;
          } else if (themePath) {
            // read css variables from css file
            themesCssVars[name] = replaceBlank(fs.readFileSync(themePath, 'utf-8'));
          }

          if (themeData.default) {
            defaultTheme = name;
          }
        });
        defaultTheme = defaultTheme || (themePackage[0] && themePackage[0].name);
        addCSSVariableCode({ defaultTheme, config, themesCssVars, rootDir, cssVariable, log });
      } else if (cssVariable && themePackage) {
        // add css variable code when cssVariable is true
        const cssVariablePath = getVariablesPath({ packageName: themePackage, filename: 'variables.css'});
        if (cssVariablePath) {
          const cssVariables = replaceBlank(fs.readFileSync(cssVariablePath, 'utf-8'));
          addCSSVariableCode({ defaultTheme: themePackage, config, themesCssVars: {[themePackage]: cssVariables}, rootDir, cssVariable, log });
        }
      }
  
      if (usePx2Vw) {
        ['css', 'scss', 'scss-module'].forEach(rule => {
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
                  require('postcss-plugin-rpx2vw'),
                  // eslint-disable-next-line
                  require('./postcssPlugins/postcssPluginPx2vw')(px2vwOptions),
                ],
              };
            });
        });
      };

      const themeFile = typeof themePackage === 'string' && getVariablesPath({ packageName: themePackage, slient: true });

      ['scss', 'scss-module'].forEach((rule) => {
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
      const iconScssPath = iconPackage && getVariablesPath({ packageName: iconPackage, filename: 'icons.scss', slient: true });
      if (iconScssPath && fs.existsSync(iconScssPath)) {
        const appendStylePluginOption = {
          type: 'sass',
          srcFile: iconScssPath,
          variableFile: getVariablesPath({ packageName: iconPackage }),
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
  
      const crossendBabelLoader = [];
  
      if ('componentOptions' in plugionOptions) {
        const { bizComponent = [], customPath = '', componentMap = {} } = componentOptions;
        const mixBizCom = {};
  
        // bizComponent: ['@alifd/anchor', '@alifd/pro-components'],
  
        if (Array.isArray(bizComponent)) {
          bizComponent.forEach(com => {
            mixBizCom[com] = `${com}${customPath}`;
          });
        }
  
        // componentMap: {
        //  '@alifd/pro-components': '@alifd/pro-components/lib/mobile',
        //  '@alifd/pro-components-2': '@alifd/pro-components-2-mobile'
        // }
        const mapList = Object.keys(componentMap);
        if (mapList.length > 0) {
          mapList.forEach(orgName => {
            mixBizCom[orgName] = componentMap[orgName];
          });
        }
  
        crossendBabelLoader.push(require.resolve('babel-plugin-module-resolver'), {
          alias: mixBizCom
        });
      }
      // 2. 组件（包含业务组件）按需加载&样式自动引入
      // babel-plugin-import: 基础组件
      // remove babel-plugin-import if external next
      if (!externalNext && !ignoreTasks.includes(taskName)) {
        const importConfigs = [{
          libraryName: '@icedesign/base',
          style,
        }, {
          libraryName: '@alife/next',
          style,
        }, {
          libraryName: '@alifd/next',
          libraryDirectory: nextLibDir,
          style: cssVariable ? (name) => `${name}/style2` : style,
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
              if (crossendBabelLoader.length > 0) {
                plugins.push(crossendBabelLoader);
              }
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
  
      if (externalNext && !ignoreTasks.includes(taskName)) {
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
            const externalKey = isNext ? 'Next' : 'ICEDesignBase';
            if (componentName) {
              return callback(null, [externalKey, upperFirst(camelCase(componentName))]);
            }
          } else if (nextRegex.test(_context) && /\.(scss|css)$/.test(request)) {
            // external style files imported by next style.js
            return callback(null, 'Next');
          }
          return callback();
        });
        config.externals(externals);
      }
      // 转化 icon content
      config.module.rule('scss').use('unicode-loader').loader(require.resolve('./webpackLoaders/unicodeLoader')).before('sass-loader');
    });
  });
};
