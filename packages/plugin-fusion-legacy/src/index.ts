import * as path from 'path';
import * as fs from 'fs';
import { IPlugin } from 'build-scripts';
import postcssPluginPx2vw from './postcssPluginPx2vw';
import getCalcVars from './theme/getCalcVars';
import getThemeVars from './theme/getThemeVars';
import getThemeCode from './theme/getThemeCode';

interface ThemeItem {
  name: string;
  default: boolean;
  themeConfig: Record<string, string>;
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
  themePackages: Partial<ThemeItem>[];
}

type GetVariablesPath = (options: { packageName: string; filename?: string; silent?: boolean }) => string;

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
    themePackages,
    cssVariable,
    enableColorNames,
  } = (options || {}) as Partial<PluginOptions>;
  const { rootDir } = context;

  const baseComponent = uniteBaseComponent && (
    typeof uniteBaseComponent === 'string' ? uniteBaseComponent : '@icedesign/base');
  
  onGetWebpackConfig((config) => {
    // 基于主题包的多主题方案
    if (themePackages && Array.isArray(themePackages)) {
      const themesCssVars = {};
      const varsPath = !cssVariable && getVariablesPath({ packageName: '@alifd/next', silent: true });

      let replaceVars = {};
      let defaultScssVars = {};
      let defaultTheme = '';
      // get scss variables and generate css variables
      themePackages.forEach(({ name, ...themeData }) => {
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
      defaultTheme = defaultTheme || (themePackages[0] && themePackages[0].name);
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