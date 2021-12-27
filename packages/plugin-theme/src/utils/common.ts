import * as path from 'path';
import { lstatSync, pathExists, readdir } from 'fs-extra';
import { IPluginAPI } from 'build-scripts';
import { curry } from 'lodash';
import * as postcssValueParser from 'postcss-value-parser';

/**
 * 匹配后缀为 `.css` 的文件名
 * 
 * @param {String} prefix 文件所在文件夹路径
 * @param {String} name 文件名
 * 
 * @return {Boolean} 是否是 css 文件
 */
const detectCssFile = curry((prefix: string, name: string): boolean => {
  const filePath = path.resolve(prefix, name);
  const stat = lstatSync(filePath);
  return !stat.isDirectory() && name.split('.').pop() === 'css';
});

/**
 * 通过文件路径名称获取主题名
 */
export const getNameFromPath = (filePath: string) => {
  const arr = filePath.replace(/^.*[\\/]/, '').split('.');
  arr.pop();
  return arr.join('.');
};

/**
 * 获取初始化主题，如果没有找到 default，则获取第一个主题文件为初始化主题
 * 
 * @param {String} names 文件名（无后缀）列表
 * @param {String} themeProperty 配置的默认主题名
 */
export const getDefaultTheme = (names: string[], themeProperty: string) => {
  const isExist = names.some(name => name === themeProperty);
  return {
    isExist,
    defaultName: isExist ? themeProperty : names[0]
  };
};

/**
 * themes 文件夹不存在 or 不存在样式文件，则视为不启动主题配置
 * 
 * @param {String} themesPath 主题目录路径
 */
export const checkThemesEnabled = async (themesPath: string): Promise<boolean> => {
  const dirExists = await pathExists(themesPath);
  if (!dirExists) return false;

  const files = await readdir(themesPath);
  if (files.length === 0) return false;

  const stylesExists = files.some(detectCssFile(themesPath));
  if (!stylesExists) return false;

  return true;
};

export const getFunction = (str: string): { name: string; params: string[] } => {
  const { nodes } = postcssValueParser(str);
  const node: any = nodes[0];

  const params = node?.nodes ? node.nodes
    .filter((i: postcssValueParser.Node) => i.type === 'word' || i.type === 'function')
    .reduce((acc: string[], item: postcssValueParser.Node) => {
      if (item.type === 'word') {
        acc.push(item.value);
      }
      if (item.type === 'function') {
        acc.push(postcssValueParser.stringify(item));
      }
      return acc;
    }, []) : [];

  return {
    name: node.value,
    params
  };
};

/**
 * 判断该字符串是否为函数调用时的形态
 * 
 * eg: rgb(0,0,0,1) -> true
 */
export const isFunction = (str: string) => {
  const { nodes } = postcssValueParser(str);
  const node = nodes[0];

  return node?.type === 'function';
};

export const getThemesName = async (themesPath: string) => {
  const files = await readdir(themesPath);
  const themesPathList = files
    .filter(detectCssFile(themesPath))
    .map(file => path.resolve(themesPath, file));
  return {
    themesPathList,
    themesNames: themesPathList.map(getNameFromPath)
  };
};

/**
 * 封装在插件目录下新建模板的逻辑
 */
export const addTemp = (applyMethod: IPluginAPI['applyMethod'], defaultName: string, themes: string[]) => {
  const themesStr = themes.map(str => `'${str}'`).join(' | ');

  // 复制模板到 .ice/theme 目录下
  const templateSourceDir = path.join(__dirname, '../../template');
  applyMethod(
    'addPluginTemplate',
    templateSourceDir,
    { themes: themesStr, defaultTheme: `'${defaultName}'` }
  );
};
