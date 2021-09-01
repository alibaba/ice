import type { Root } from 'postcss';
import postcss from 'postcss';
import * as path from 'path';
import * as fs from 'fs';
import { isFunction } from '../../utils/common';

interface INode {
  name: string,
  value: string,
  node: Root
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
      value: 'params'
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

/**
 * 实现 postcss-import
 * 
 * @param {Root} root less / sass
 * @param {string} type 或者称之为 node（postcss node）
 * @param {Function} cb 遍历时触发的回调函数 传入当前文件节点
 * 
 * @return {Array} 返回的 postcss 节点列表
 */
export const walkDeps = (root: Root, type: string, cb: (tree: Root) => void = () => { }) => {
  const deps = new Map<string, Root>();
  const blacklist = ['/reset', 'mixin', '_'];      // 扫描文件的黑名单

  /**
   * 不处理存在于黑名单内单词的路径
   */
  const isBlack = (list: string[], id: string): boolean => {
    return list.some(word => id.includes(word));
  };

  /**
   * 去掉字符左右引号
   */
  const getValue = (str: string) => {
    const value = str.trim();
    return value.slice(1, value.length - 1);
  };

  const resolve = (node: Root, url?: string) => {
    const baseUrl = url ?? node.source.input.file;
    const baseDir = path.dirname(baseUrl);
    deps.set(baseUrl, node);
    cb(node);   // 触发回调

    node.walkAtRules(decl => {
      const isImport = decl.name === 'import';

      if (isImport) {
        let id = getValue(decl.params);
        // 如果是 css 则不参与解析
        if (id.endsWith('.css')) return;

        const ext = type === 'less' ? '.less' : '.scss';
        id = id.endsWith(ext) ? id : `${id}${ext}`;

        if (isBlack(blacklist, id)) return;

        let pathUrl = path.resolve(baseDir, id);
        // 如果项目文件目录不存在，则到 node_modules 查找
        if (!fs.existsSync(url)) {
          pathUrl = path.resolve(`node_modules/${id}`);
        }

        if (deps.has(pathUrl)) return;

        const file = fs.readFileSync(pathUrl, 'utf8');
        // eslint-disable-next-line global-require
        const parser = type === 'less' ? require('postcss-less') : require('postcss-scss');
        const rt = postcss().process(file, { parser, from: pathUrl }).root;

        // 递归到下一层
        resolve(rt, pathUrl);
      }
    });
  };

  resolve(root);

  const list = [];

  deps.forEach(value => {
    list.push(value);
  });

  // 反转数组，保证依赖的最深层优先处理
  return list.reverse();
};

/**
 * 获取该 postcss node 树下的全部变量
 */
export const getAllVars = (node: Root, type: string, cb: (name: string, value: string) => void) => {
  walker(type, node, ({ name, value }) => {
    if (isFunction(value) || name === 'import') return;
    const varName = type === 'less' ? name.slice(0, name.length - 1) : name;
    cb(varName, value);
  });
};
