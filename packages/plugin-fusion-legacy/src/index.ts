import * as path from 'path';
import * as fs from 'fs';
import { IPlugin } from 'build-scripts';
import postcssPluginPx2vw from './postcssPluginPx2vw';
import AppendStyleWebpackPlugin from './webpackPlugins/appendStyleWebpackPlugin';
import getCalcVars from './theme/getCalcVars';
import getThemeVars from './theme/getThemeVars';
import getThemeCode from './theme/getThemeCode';

interface ThemeItem {
  name: string;
  default: boolean;
  themeConfig: Record<string, string>;
}

interface ComponentOptions {
  bizComponent: string[];
  customPath: string;
  componentMap: Record<string, string>;
}

interface ThemeVars {
  scssVars?: Record<string, string>;
  originTheme?: Record<string, string>;
  cssVars?: Record<string, string>;
}

interface PluginOptions {
  uniteBaseComponent: boolean | string;
  usePx2Vw: boolean;
  px2vwOptions: object;
  cssVariable: boolean;
  enableColorNames: boolean;
  themePackage: Partial<ThemeItem>[] | string;
  themeConfig: Record<string, string>;
  uniteNextLib: string;
  componentOptions: ComponentOptions;
}

type GetVariablesPath = (options: { packageName: string; filename?: string; silent?: boolean }) => string;
interface Chunk {
  name: string;
}
type NormalizeEntry = (entry: Record<string, string>, chunks: Chunk[]) => string[];

const getVariablesPath: GetVariablesPath = (packageName, filename = 'variables.scss', silent = false) => {
  let filePath = '';
  const variables = `${packageName}/${filename}`;
  try {
    filePath = require.resolve(variables);
  } catch (err) {
    if (!silent) {
      console.log('[ERROR]', `fail to resolve ${variables}`);
    }
  }
  return filePath;
};

const normalizeEntry: NormalizeEntry = (entry, preparedChunks) => {
  const preparedName = (preparedChunks || [])
    .filter((module) => {
      return typeof module.name !== 'undefined';
    })
    .map((module) => module.name);

  return Object.keys(entry).concat(preparedName);
};

function replaceBlank(str: string) {
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

const plugin: IPlugin = ({ onGetWebpackConfig, log, context }, options) => {
  const {
    uniteBaseComponent,
    usePx2Vw,
    px2vwOptions,
    themePackage,
    cssVariable,
    enableColorNames,
    uniteNextLib,
    themeConfig,
    componentOptions,
  } = (options || {}) as Partial<PluginOptions>;
  const { rootDir, webpack, userConfig } = context;

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

  const baseComponent = uniteBaseComponent && (
    typeof uniteBaseComponent === 'string' ? uniteBaseComponent : '@icedesign/base');
  
  onGetWebpackConfig((config) => {
    // 基于主题包的多主题方案
    let replaceVars = {};
    let defaultScssVars = {};
    let defaultTheme = '';
    if (themePackage && Array.isArray(themePackage)) {
      const themesCssVars = {};
      const varsPath = !cssVariable && getVariablesPath({ packageName: '@alifd/next', silent: true });

      // get scss variables and generate css variables
      themePackage.forEach(({ name, ...themeData }) => {
        const themePath = getVariablesPath({ packageName: name, filename: `variables.${cssVariable ? 'css' : 'scss'}` });
        if (!cssVariable) {
          const configData = themeData.themeConfig || {};
          let themeVars: ThemeVars = {};
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

      ['scss', 'scss-module'].forEach((rule) => {
        if (config.module.rule(rule).uses.get('ice-skin-loader')) {
          config.module
            .rule(rule)
            .use('ice-skin-loader')
            .tap((loaderOptions) => {
              return {
                ...loaderOptions,
                themeConfig: {
                  defaultScssVars,
                  replaceVars,
                  ...(loaderOptions.themeConfig || {}),
                }
              };
            });
        }
      });
    } else if (cssVariable && typeof themePackage === 'string') {
      // add css variable code when cssVariable is true
      const cssVariablePath = getVariablesPath({ packageName: themePackage, filename: 'variables.css'});
      if (cssVariablePath) {
        const cssVariables = replaceBlank(fs.readFileSync(cssVariablePath, 'utf-8'));
        addCSSVariableCode({ defaultTheme: themePackage, config, themesCssVars: {[themePackage]: cssVariables}, rootDir, cssVariable, log });
      }
    }

    const themeFile = typeof themePackage === 'string' && getVariablesPath({ packageName: themePackage, silent: true });

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
    const iconPackage = (defaultTheme || themePackage) as string;
    const iconScssPath = iconPackage && getVariablesPath({ packageName: iconPackage, filename: 'icons.scss', silent: true });
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

    if (baseComponent) {
      // 统一基础组件包：@ali/ice, @alife/next, @icedesign/base -> @icedesign/base
      log.info('uniteBaseComponent 开启，基础包统一到：', baseComponent);
      
      const alias = {
        // @ali/ice -> uniteBaseComponent
        '@ali/ice/global.scss': `${baseComponent}/reset.scss`,
        '@ali/ice/lib/row$': `${baseComponent}/lib/_components/@alife/next-grid/lib/row.js`,
        '@ali/ice/lib/col$': `${baseComponent}/lib/_components/@alife/next-grid/lib/col.js`,
        // sass 里 @import '~xxx'
        '@ali/ice/base.scss': `${baseComponent}/lib/core/index.scss`,
        '@ali/ice': baseComponent,

        // @alife/next -> uniteBaseComponent
        '@alife/next/lib/_components/@alife/next-core/lib/index.scss': `${baseComponent}/reset.scss`,
        '@alife/next/reset.scss': `${baseComponent}/reset.scss`,
        // sass 里 @import '~xxx'
        '@alife/next/variables.scss': `${baseComponent}/variables.scss`,
        '@alife/next/lib/core/index.scss': `${baseComponent}/lib/core/index.scss`,
        '@alife/next': `${baseComponent}`,

        // @icedesign/base -> uniteBaseComponent
        '@icedesign/base/reset.scss': `${baseComponent}/reset.scss`,
        // sass 里 @import '~xxx'
        '@icedesign/base/variables.scss': `${baseComponent}/variables.scss`,
        '@icedesign/base/lib/core/index.scss': `${baseComponent}/lib/core/index.scss`,
        '@icedesign/base': `${baseComponent}`,
      };

      config.merge({
        resolve: {
          alias,
        },
      });
    }

    if (uniteNextLib) {
      const replaceRegex = new RegExp(`(alife|alifd)/next/${uniteNextLib === 'es' ? 'lib' : 'es'}`);
      config.plugin('UniteNextLib')
        .use(webpack.NormalModuleReplacementPlugin, [
          /@(alife|alifd)\/next\/(.*)/,
          function(resource) {
            // eslint-disable-next-line no-param-reassign
            resource.request = resource.request.replace(replaceRegex, `alifd/next/${uniteNextLib}`);
          },
        ]);
    }

    const crossendBabelLoader = [];
    if (componentOptions) {
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

    // babel-plugin-import for @alife/next and @icedesign/base
    const importConfigs = [{
      libraryName: '@icedesign/base',
      style: true,
    }, {
      libraryName: '@alife/next',
      style: true,
    }];

    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((babelOptions) => {
          const plugins = babelOptions.plugins.concat(
            importConfigs.map((itemConfig) => {
              return [require.resolve('babel-plugin-import'), itemConfig, itemConfig.libraryName];
            }),
          );
          if (crossendBabelLoader.length > 0) {
            plugins.push(crossendBabelLoader);
          }
          return {
            ...babelOptions,
            plugins,
          };
        });
    });

    if (usePx2Vw) {
      ['css', 'scss', 'scss-module'].forEach(rule => {
        config.module
          .rule(rule)
          .use('postcss-loader')
          .tap((loaderOptions) => {
            const { plugins = [] } = loaderOptions;
            return {
              ...loaderOptions,
              plugins: [
                ...plugins,
                // eslint-disable-next-line
                require('postcss-plugin-rpx2vw'),
                // eslint-disable-next-line
                postcssPluginPx2vw(px2vwOptions),
              ],
            };
          });
      });
    }
  });
};

export default plugin;