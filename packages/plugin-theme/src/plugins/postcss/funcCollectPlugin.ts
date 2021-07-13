import * as lessCompile from 'less';
import type { Root, TransformCallback } from 'postcss';
import { walkDeps, walkerSome, walkerFind, getAllVars } from '../helper/walkers';
import { getFunction, isFunction } from '../../utils/common';

interface Option {
  type?: 'sass' | 'less',
  data: any
  setData: (data: any) => void
}

/**
 * 函数分析工具
 * 
 * 消费并变更 themesData
 */
export const funcCollectPlugin = (options: Option): TransformCallback => {
  const { type = 'less', data, setData } = options;
  const varFlag = type === 'less' ? '@' : '$';
  const themes: string[] = Object.entries(data).map(([key]) => key);
  const depthVarSet = new Set<string>(Object.entries(data[themes[0]]).map(i => i[0]));
  const funcVarMap = {};
  const varMap = new Map<string, string>();

  // initial funcVarMap
  themes.forEach(theme => {
    funcVarMap[theme] = {};
  });

  const getDepthVar = (p: string, node: Root) => {
    if (p[0] !== varFlag) return false;

    p = p.slice(1);  // 剔除 less/sass 变量前缀
    // 没有存在于 cache 中
    if (depthVarSet.has(p)) return true;

    return walkerSome(type, node, ({ name, value }) => {
      if (p === name || p === '') {
        if (isFunction(value)) {
          const { params } = getFunction(value);
          if (params.some(e => getDepthVar(e, node))) {
            depthVarSet.add(name);

            // break
            if (p === name) return true;
          }
        }
      }
    });
  };

  const getParam = (theme: string, p: string, node: Root) => {
    // 参数为函数
    if (isFunction(p)) {
      const funcData = getFunction(p);
      return getCalc(funcData.name, funcData.params.map(v => getParam(theme, v, node)));
    }
    // 参数不为变量，到这里是参数为常数
    if (p[0] !== varFlag) return p;

    // 参数为变量
    p = p.slice(1); // 剔除 less/sass 变量前缀
    if (data[theme]?.[p]) return data[theme][p];

    return walkerFind(type, node, ({ name, value }) => {
      if (p === name || p === '') {
        let result: string | undefined;
        if (isFunction(value)) {
          const { name: funcName, params } = getFunction(value);
          const calcValue = getCalc(funcName, params.map(v => getParam(theme, v, node)));

          funcVarMap[theme][name] = calcValue;
          result = calcValue;
        } else {
          result = value;
        }

        // continue
        if (p === '') return;

        // break
        return result;
      }
    });
  };

  return root => {
    const run = (node: Root) => {

      // get all var
      getAllVars(node, type, (n, v) => {
        varMap.set(n, v);
      });

      // get depthVarSet
      getDepthVar(varFlag, node);

      // get funcVarMap
      themes.forEach(theme => {
        getParam(theme, varFlag, node);
      });

      // pick depthVarSet to funcVarMap
      depthVarSet.forEach(i => {
        themes.forEach(theme => {
          if (data[theme][i]) return;
          data[theme][i] = funcVarMap[theme][i];
        });
      });
    };

    walkDeps(root, type).forEach(run);

    setData(data);
  };
};

const filterParams = (params: string[]) => {
  const less = lessCompile as any;
  return params.map(p => {
    switch (true) {
      case p[0] === '#':
        return less.color(p.slice(1));
      case p[p.length - 1] === '%':
        return less.value(p.slice(0, p.length - 1));
      case Number.isNaN(p):
        return less.value(p);
      default:
        return Number(p ?? 0);
    }
  });
};

const getCalc = (funcName: string, params: string[]): string => {
  try {
    const func = (lessCompile as any).functions.functionRegistry.get(funcName);
    if (func) {
      if (funcName === 'rgba' && params.length === 2) return func((lessCompile as any).color('#000'), params[1]);
      return func(...filterParams(params)).toCSS();
    }
    return '';
  } catch (e) {
    return '';
  }
};
