import * as postcss from 'postCSS';
import produce from 'immer';
import { readFileSync } from 'fs-extra';
import { IPluginAPI } from '@alib/build-scripts';
import { getThemeName } from '../utils/common';

interface ThemesDataType {
  [themeKey: string]: ThemeVarsType
}

interface ThemeVarsType {
  [cssVariable: string]: string
}

let __themesData__: ThemesDataType = {};

/**
 * 生成 themesData 对象字符串
 */
const getThemesDataStr = (defaultName: string) => {
  const themesData = getThemesData();
  const themesDataStr = Object
    .keys(themesData)
    .filter(themeKey => themeKey !== defaultName)
    .map((themeKey) => {
      const cssVars = themesData[themeKey];
      return `'${themeKey}': ':root {${Object.entries(cssVars).map(([k, v]) => `--${k}: ${v}`).join(';')}}'`;
    })
    .join(',');

  return themesDataStr;
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
const injectThemes = ({ onGetWebpackConfig }: IPluginAPI, jsPath: string, themesPathList: string[]) => {
  // 将 themes 所有变量注入到 themesVar
  setThemesData(themesPathList);

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
  getThemesDataStr,
  ThemeVarsType
};