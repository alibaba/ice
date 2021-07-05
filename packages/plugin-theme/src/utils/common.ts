import * as path from 'path';
import { lstatSync, pathExists, readdir } from 'fs-extra';
import { curry } from 'lodash';
import type { Root } from 'postcss';

interface INode {
  name: string,
  value: string,
  node: any
}

// walker 差异化配置项
const config = {
  less: {
    walker: 'walkAtRules',
    node: {
      name: 'name',
      nameGetter: (str: string) => str,
      value: 'params',
    }
  },
  sass: {
    walker: 'walkDecls',
    node: {
      name: 'prop',
      nameGetter: (str: string) => str.slice(1),
      value: 'value'
    }
  }
};

/**
 * 获取 postcss 解析后的 ast 节点的某些值
 */
const getNode = (type: string, node: Root): INode => {
  const { name, nameGetter, value } = config[type].node;
  return {
    name: nameGetter(node[name]),
    value: node[value],
    node: config[type].node
  };
};

/**
 * 匹配后缀为 `.css` 的文件名
 * 
 * @param {string} prefix 文件所在文件夹路径
 * @param {string} name 文件名
 * 
 * @return {boolean} 是否是 css 文件
 */
export const detectCssFile = curry((prefix: string, name: string): boolean => {
  const filePath = path.resolve(prefix, name);
  const stat = lstatSync(filePath);
  return !stat.isDirectory() && name.split('.').pop() === 'css';
});

/**
 * 通过文件路径名称获取主题名
 */
export const getThemeName = (filePath: string) => {
  return filePath.replace(/(.*\/)*([^.]+).*/ig, '$2');
};

/**
 * 获取初始化主题，如果没有找到 default，则获取第一个主题文件为初始化主题
 * 
 * @param {string} names 文件名（无后缀）列表
 */
export const getDefaultTheme = (names: string[]) => {
  const isExist = names.some(name => name === 'default');
  return {
    isExist,
    defaultName: isExist ? 'default' : names[0]
  };
};

/**
 * themes 文件夹不存在 or 不存在样式文件，则视为不启动主题配置
 * 
 * @param {string} themesPath 主题目录路径
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

/**
 * TODO: 目前只能做到取一个函数的名字和参数，对于嵌套情况无效...
 */
export const getFunction = (str: string) => {
  const list = str.replace(/\s+/g, '').match(/[^(|,|)]+/g);

  return {
    name: list[0],
    params: list.slice(1)
  };
};

/**
 * 判断该字符串是否为函数调用时的形态
 * 
 * eg: rgb(0,0,0,1) -> true
 */
export const isFunction = (str: string) => {
  // eslint-disable-next-line no-useless-escape
  const reg = /^[A-Za-z_]+[A-Za-z0-9_-]*[\(][\s\S]*[\)]$/g;
  return reg.test(str);
};

/**
 * 重新封装后的 postcss 遍历函数 (sync)
 */
export const walker = (type: string, root: Root, cb: (data: INode) => void) => {
  return root[config[type].walker](e => cb(getNode(type, e)));
};

/**
 * walker 函数，对标 Array some 的能力
 * 
 * @param {string} type less / sass
 * @param {Root} root 或者称之为 node（postcss node）
 * @param {function} cb 遍历时触发的回调函数
 * 
 * @return {any} 查找成功后返回 true，如果一直未找到，则返回 false
 */
export const walkerSome = (type: string, root: Root, cb: (data: INode) => boolean) => {
  let result = false;
  walker(type, root, e => {
    const value = cb(e);
    if (value) {
      result = true;
      // break
      return false;
    }
  });
  return result;
};

/**
 * walker 函数，对标 Array find 的能力
 * 
 * @param {string} type less / sass
 * @param {Root} root 或者称之为 node（postcss node）
 * @param {function} cb 遍历时触发的回调函数
 * 
 * @return {any} 查找成功后返回的具体数值（和 find 不一样的一点在于他是返回回调里返回的数值）
 */
export const walkerFind = <T>(type: string, root: Root, cb: (data: INode) => T) => {
  let result: T;
  walker(type, root, e => {
    const value = cb(e);
    if (value) {
      result = value;
      return false;
    }
  });
  return result;
};
