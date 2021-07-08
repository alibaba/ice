import postcss from 'postcss';
import * as atImport from 'postcss-import';
import { readFileSync } from 'fs-extra';
import { getNameFromPath } from '../utils/common';
import { getThemeVarsPlugin } from '../plugins/postcss/getThemeVarsPlugin';

interface ThemesDataType {
  [themeKey: string]: ThemeVarsType
}

interface ThemeVarsType {
  [cssVariable: string]: string
}

const __themesData__: ThemesDataType = {};

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
const getThemeVars = async (filePath: string): Promise<ThemeVarsType> => {
  const themeVars: ThemeVarsType = {};
  const css = readFileSync(filePath, 'utf8');

  await postcss([
    atImport(),
    getThemeVarsPlugin({ themeVars })
  ]).process(css, { from: filePath });

  return themeVars;
};

/**
 * 设置 Themes Data
 */
const setThemesData = async (themesPathList: string[]) => {
  themesPathList.forEach(async file => {
    const themeName = getNameFromPath(file);
    const value = await getThemeVars(file);

    __themesData__[themeName] = value;
  });
};

const getThemesData = () => __themesData__;

export {
  setThemesData,
  getThemesData,
  getThemesDataStr,
  ThemeVarsType
};