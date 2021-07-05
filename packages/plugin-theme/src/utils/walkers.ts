import type { Root } from 'postcss';

interface INode {
  name: string,
  value: string,
  node: any
}

/**
 * walker 差异化配置项
 */
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
 * 重新封装后的 postcss 遍历函数 (sync)
 */
export const walker = (type: string, root: Root, cb: (data: INode) => void) => {
  return root[config[type].walker](e => cb(getNode(type, e)));
};

/**
 * walker 函数，对标 Array some 的能力
 * 
 * @param {String} type less / sass
 * @param {Root} root 或者称之为 node（postcss node）
 * @param {Function} cb 遍历时触发的回调函数
 * 
 * @return {Boolean} 查找成功后返回 true，如果一直未找到，则返回 false
 */
export const walkerSome = (type: string, root: Root, cb: (data: INode) => boolean): boolean => {
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
 * @param {String} type less / sass
 * @param {Root} root 或者称之为 node（postcss node）
 * @param {Function} cb 遍历时触发的回调函数
 * 
 * @return {T} 查找成功后返回的具体数值（和 find 不一样的一点在于他是返回回调里返回的数值）
 */
export const walkerFind = <T extends any>(type: string, root: Root, cb: (data: INode) => T): T => {
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
