import * as postcss from 'postcss';
import * as atImport from 'postcss-import';
import produce from 'immer';
import { readFileSync } from 'fs-extra';
import { getThemeName } from '../utils/common';
import { getThemeVarsPlugin } from '../plugins/postcss/getThemeVarsPlugin';

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

  return `{${themesDataStr}}`;
};

/**
 * 获取 css 变量内容
 * 
 * @param {string} filePath 主题文件路径
 */
const getThemeVars = (filePath: string): ThemeVarsType => {
  const themeVars: ThemeVarsType = {};
  const css = readFileSync(filePath, 'utf8');

  // eslint-disable-next-line no-unused-expressions
  postcss([
    atImport(),
    getThemeVarsPlugin({ themeVars })
  ]).process(css, { from: filePath }).css;

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

export {
  setThemesData,
  getThemesData,
  getThemesDataStr,
  ThemeVarsType
};