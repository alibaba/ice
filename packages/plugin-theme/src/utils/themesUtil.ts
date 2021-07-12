import * as fse from 'fs-extra';
import * as path from 'path';
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

let __themesData__: ThemesDataType = {};

const cacheUrl = path.resolve('node_modules', '.cache', 'themes_data.json');

/**
 * 生成 themesData 对象字符串
 */
const getThemesDataStr = (defaultName: string) => {
  // get data form cache
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
  ] as any).process(css, { from: filePath });

  return themeVars;
};

/**
 * 根据主题文件导出 themesData
 */
const parseThemesData = async (themesPathList: string[]) => {
  const data = {};
  themesPathList.forEach(async file => {
    const themeName = getNameFromPath(file);
    const value = await getThemeVars(file);

    data[themeName] = value;
  });

  return data;
};

const setThemesData = (newData: ThemesDataType, persist = false) => {
  __themesData__ = newData;

  // update cache
  if (persist) fse.outputFileSync(cacheUrl, JSON.stringify(newData));
};

const getThemesData = () => {
  // read persist
  if (fse.existsSync(cacheUrl)) {
    const fileString = fse.readFileSync(cacheUrl, 'utf8');
    const data = JSON.parse(fileString);

    if (data) return data;
  }

  return __themesData__;
};

export {
  parseThemesData,
  getThemesData,
  getThemesDataStr,
  setThemesData,
  ThemeVarsType
};