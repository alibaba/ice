import * as path from 'path';
import * as prettier from 'prettier';
import * as postcss from 'postCSS';
import produce from 'immer';
import { readFileSync } from 'fs-extra';
import { IPluginAPI } from '@alib/build-scripts';
import { PLUGIN_DIR, ICE_TEMP } from '../constant';
import { getThemeName, writeFile } from '../utils/common';

interface ThemesDataType {
  [themeKey: string]: ThemeVarsType
}

interface ThemeVarsType {
  [cssVariable: string]: string
}

let __themesData__: ThemesDataType = {};

/**
 * 生成注入到 entry 第一个元素的代码，注册 css 变量数据与主题变化控制函数
 */
const getThemesCode = (themesData: ThemesDataType, defaultTheme: string) => {
  const themesDataStr = Object.keys(themesData).map((themeKey) => {
    const cssVars = themesData[themeKey];
    return `'${themeKey}': ':root {${Object.entries(cssVars).map(([k, v]) => `--${k}: ${v}`).join(';')}}'`;
  }).join(',');

  return `
    const themesData = {${themesDataStr}};
    // Append Style fn
    let style;
    function appendStyle(styles) {
      if (style) style.remove();
      style = document.createElement('style');
      style.type = 'text/css';

      if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = styles;
      } else {
        style.appendChild(document.createTextNode(styles));
      }
      // Append style to the head element
      document.getElementsByTagName('head')[0].appendChild(style);
    }
    // Change theme fn
    function handleTheme(currentTheme) {
      // Get current theme
      const theme = themesData[currentTheme];
      if (theme) {
        appendStyle(theme);
      } else {
        console.warn('can not find theme:' + currentTheme);
      }
    }
    ${defaultTheme ? `handleTheme('${defaultTheme}');` : ''}
    window.__handleTheme__ = handleTheme;
  `;
};

/**
 * 获取 css 变量内容
 * 
 * @param {string} filePath 主题文件路径
 */
const getThemeVars = (filePath: string): ThemeVarsType => {
  const themeVars: ThemeVarsType = {};
  const css = readFileSync(filePath, 'utf8');

  postcss([(root) => {
    root.walkDecls(decl => {
      if (decl.prop && decl.prop.slice(0, 2) === '--') {
        themeVars[decl.prop.slice(2)] = decl.value;
      }
    });
  }]).process(css).then();

  return themeVars;
};

/**
 * 设置 Themes Data
 */
const setThemesData = (themesPathList: string[]) => {
  const data = produce(__themesData__, (draft) => {
    themesPathList.forEach(file => {
      const themeName = getThemeName(file);
      const value = getThemeVars(file);

      draft[themeName] = value;
    });
  });

  __themesData__ = data;
};

const getThemesData = () => __themesData__;

/**
 * 注入主题数据与主题动态变更逻辑
 * 
 * TODO: Lazy Load CSS variable data
 */
const injectThemes = ({ onGetWebpackConfig, getValue }: IPluginAPI, defaultName: string, themesPathList: string[]) => {
  const iceTemp = getValue(ICE_TEMP);
  const jsPath = path.resolve(iceTemp, PLUGIN_DIR, 'injectTheme.js');   // .ice/themes/injectTheme.js

  // 将 themes 所有变量注入到 themesVar
  setThemesData(themesPathList);

  // 通过 themesVar 生成注入代码
  const code = getThemesCode(getThemesData(), defaultName);
  const prettierCode = prettier.format(code);   // 美化样式注入代码
  writeFile(jsPath, prettierCode);

  // 配置 injectTheme.js 引入 webpack Entry
  onGetWebpackConfig(config => {
    const entryNames = Object.keys(config.entryPoints.entries());
    entryNames.forEach((name) => {
      config.entry(name).prepend(jsPath);
    });
  });
};

export {
  getThemesData,
  injectThemes,

  ThemeVarsType
};