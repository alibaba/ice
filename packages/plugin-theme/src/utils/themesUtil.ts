import * as fse from 'fs-extra';
import * as path from 'path';
import * as atImport from 'postcss-import';
import postcss from 'postcss';
import { getNameFromPath } from '../utils/common';
import { getThemeVarsPlugin } from '../plugins/postcss/getThemeVarsPlugin';

interface ThemesDataType {
  [themeKey: string]: ThemeVarsType
}

interface ThemeVarsType {
  [cssVariable: string]: string
}

// 全局主题数据，建议只通过 getThemesData 获取
let __themesData__: ThemesDataType = {};

// 主题数据缓存文件 ${project}/node_modules/.cache/themes_data.json
const cacheUrl = path.resolve('node_modules', '.cache', 'themes_data.json');

/**
 * 组合 themesData 对象字符串
 */
const getThemesDataStr = (themesData: ThemesDataType, defaultName: string) => {
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
  const css = fse.readFileSync(filePath, 'utf8');

  await postcss([
    atImport(),
    getThemeVarsPlugin({ themeVars })
  ] as any).process(css, { from: filePath });

  return themeVars;
};

/**
 * 根据主题文件导出 themesData
 * 
 * @param {String[]} themesPathList 主题文件（css）的绝对路径列表
 */
const parseThemesData = async (themesPathList: string[]) => {
  const data = {};

  const task = async (file: string) => {
    const themeName = getNameFromPath(file);
    const value = await getThemeVars(file);
    data[themeName] = value;
  };

  await Promise.all(themesPathList.map(task));

  return data;
};

/**
 * 提交主题变更
 * 
 * @param {ThemesDataType} newData 新主题数据
 * @param {Boolean} persist 本次提交是否开启持久化缓存
 */
const setThemesData = (newData: ThemesDataType, persist = false) => {
  __themesData__ = newData;

  // update cache
  if (persist) fse.outputFileSync(cacheUrl, JSON.stringify(newData));
};

/**
 * 获取主题数据
 * 
 * @return {ThemesDataType} 主题数据
 */
const getThemesData = (): ThemesDataType => {
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