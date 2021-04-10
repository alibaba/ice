import * as path from 'path';
import { formatPath } from '@builder/app-helpers'

// match:
// eg: src/pages/home | src/pages/home/index | src/pages/home/index(.tsx|.jsx) | src/pages/index(.tsx|jsx)
const pagePathRegExp = /src\/pages\/\w+((.tsx|.jsx?)$|(\/index(.tsx|.jsx?)?)?$)/;
// eg：src/pages/home/Layout
const layoutPathRegExp = /src\/pages\/\w+\/Layout/;

module.exports = ({ types: t }, { routesPath, alias, tempDir, applyMethod }) => {
  return {
    visitor: {
      /*
      Convert all "import XXX from '???/pages/XXX'" statement to "import XXX from 'ice/pages/XXX'"

      // before:
      约定式路由：
      e.g: import Home from '../src/pages/Home/index.tsx';
      e.g: import Index from '../src/pages/index.tsx;
      配置式路由：
      default alias: import Home from '@/pages/Home';
      custom alias: import Home from '$pages/Home';
      relative path: import Home from '../pages/Home'

      // after:
      import Home from 'ice/pages/Home'
      */
      ImportDeclaration(nodePath, state) {
        const isRoutesFile = routesPath.includes(state.filename);
        if (isRoutesFile) {
          const { source, specifiers } = nodePath.node;
          // issue: https://github.com/ice-lab/icejs/issues/271
          if (t.isImportDefaultSpecifier(specifiers[0]) && specifiers.length === 1) {
            if (t.isStringLiteral(source)) {
              const { value } = source;
              const newValue = formatPagePath({ routesPath: state.filename, tempDir, value, alias, applyMethod });
              if (newValue) {
                replaceWith(t, nodePath, newValue);
              }
            }
          }
        }
      },

      /*
      Convert all "const XXX = lazy(() => import('???/pages/XXX'))" statement to "const XXX =lazy (() => import('ice/XXX'))"

      // before:
      约定式路由：
      e.g: const Home = lazy(() => import('../src/pages/Home/index.tsx'));
      配置式路由：
      default alias: const Home = lazy(() => import('@/pages/Home'));
      custom alias: const Home = lazy(() => import('$pages/home));
      relative path: const Home = lazy(() => import('../pages/Home'));

      // after:
      const Home =lazy (() => import('ice/Home'));
      */
      CallExpression(nodePath, state) {
        const isRoutesFile = routesPath.includes(state.filename);
        if (isRoutesFile) {
          if (t.isImport(nodePath.node.callee)) {
            const args = nodePath.node.arguments;
            for (let i = 0; i < args.length; i++) {
              const value = args[i].value;
              if (typeof value === 'string') {
                const newValue = formatPagePath({ routesPath: state.filename, tempDir, value, alias, applyMethod });
                if (newValue) {
                  args[i].value = newValue;
                }
              }
            }
          }
        }
      },
    },
  };
};

interface IAlias {
  [key: string]: string;
}

interface IGetConfigRoutePathParmas {
  routesPath: string;
  value: string;
  tempDir: string;
  alias: IAlias;
  applyMethod: Function;
}

// enum alias:
//  case1: { "@": "./src", "@pages": "./src/pages" }
//  case2: { "@src": "./src", "@pages": "./src/pages" }
//  case3: { "@": "./src", "@/pages": "./src/pages" }
function matchAliasPath(alias: IAlias, value: string, applyMethod: Function): string {
  let aliasPath = '';
  // use default alias
  if (!Object.keys(alias).length) {
    alias['@'] = 'src';
  }
  // use custom alias
  Object.keys(alias).forEach(currKey => {
    if (value.startsWith(currKey)) {
      const [, ...args] = value.split(currKey);
      const currAliasPath = formatPath(path.join(alias[currKey], ...args));
      if (currAliasPath.includes('src/pages')) {
        aliasPath = currAliasPath;
      }
    }
  });
  return aliasPath;
}

/**
 * 匹配配置式路由下使用的相对路径并返回相对的 src 的相对路径
 */
function matchRelativePath(routesPath: string, value: string, applyMethod: Function): string {
  let relativePath = '';
  if (/^(\.\/|\.{2}\/)/.test(value)) {
    relativePath = formatPath(path.relative(process.cwd(), path.join(routesPath, '..', value)));
  }
  return relativePath;
}

/**
 * 格式化路由的替换路径值
 */
function formatPagePath({ routesPath, value, alias, tempDir, applyMethod }: IGetConfigRoutePathParmas): string {
  const matchedPagePath = matchRelativePath(routesPath, value, applyMethod) || matchAliasPath(alias, value, applyMethod);
  if (matchedPagePath && pagePathRegExp.test(matchedPagePath)) {
    let newValue = '';
    // Note：过滤掉 pages 目录下的单文件形式
    if (/src\/pages\/\w+(.tsx|.jsx?)$/.test(value)) {
      return newValue;
    } else {
      const [, , pageName] = matchedPagePath.split('/');
      newValue = pageName ? `${tempDir}/${pageName}` : '';
    }
    return newValue;
  } else if (matchedPagePath && layoutPathRegExp.test(matchedPagePath)) {
    const [, , pageName] = matchedPagePath.split('/');
    const newValue = pageName ? `${tempDir}/${pageName}/Layout` : '';
    return newValue;
  }
}

/**
 * AST 节点替换
 */
function replaceWith(t, nodePath, value) {
  nodePath.replaceWith(
    t.ImportDeclaration(
      nodePath.node.specifiers,
      t.stringLiteral(value)
    )
  );
}
