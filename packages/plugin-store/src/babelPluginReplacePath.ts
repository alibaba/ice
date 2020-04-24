import * as path from 'path';

// match:
// eg: src/pages/home | src/pages/home/index(.tsx|.jsx) | src/pages/index(.tsx|jsx)
const pathRegExp = /src\/pages\/\w+((.tsx|.jsx?)$|(\/index(.tsx|.jsx?))?$)/;

module.exports = ({ types: t }, { routesPath, alias, applyMethod }) => {
  return {
    visitor: {
      ImportDeclaration(nodePath, state) {
        const isRoutesFile = (routesPath === state.filename);
        if (isRoutesFile) {
          const { source, specifiers } = nodePath.node;
          // issue: https://github.com/ice-lab/icejs/issues/271
          if (t.isImportDefaultSpecifier(specifiers[0]) && specifiers.length === 1) {
            if (t.isStringLiteral(source)) {
              const { value } = source;
              // 约定式路由：
              // e.g: import Home from '../src/pages/Home/index.tsx';
              // e.g: import Index from '../src/pages/index.tsx;
              // 配置式路由：
              // default alias: import Home from '@/pages/Home';
              // custom alias: import Home from '$pages/Home';
              // relative path: import Home from '../pages/Home'
              const newValue = formatPagePath({ routesPath, value, alias, applyMethod });
              // replace to: import Home from 'ice/pages/Home'
              if (newValue) {
                replaceWith(t, nodePath, newValue);
              }
            }
          }
        }
      },

      CallExpression(nodePath, state) {
        const isRoutesFile = (routesPath === state.filename);
        if (isRoutesFile) {
          if (t.isImport(nodePath.node.callee)) {
            const args = nodePath.node.arguments;
            for (let i = 0; i < args.length; i++) {
              const value = args[i].value;
              if (typeof value === 'string') {
                // 约定式路由：
                // e.g: const Home = lazy(() => import(/* webpackChunkName: 'Home' */ '../src/pages/Home/index.tsx'));
                // 配置式路由：
                // default alias: const Home = lazy(() => import('@/pages/Home'));
                // custom alias: const Home = lazy(() => import('$pages/home));
                // relative path: const Home = lazy(() => import('../pages/Home'));
                const newValue = formatPagePath({ routesPath, value, alias, applyMethod });
                // replace to: const Home =lazy (() => import('ice/Home/Home'));
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
      const currAliasPath = applyMethod('formatPath', path.join(alias[currKey], ...args));
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
    relativePath = applyMethod('formatPath',
      path.relative(process.cwd(), path.join(routesPath, '..', value))
    );
  }
  return relativePath;
}

/**
 * 格式化路由的替换路径值
 */
function formatPagePath({ routesPath, value, alias, applyMethod }: IGetConfigRoutePathParmas): string {
  const matchedPagePath = matchRelativePath(routesPath, value, applyMethod) || matchAliasPath(alias, value, applyMethod);
  if (matchedPagePath && pathRegExp.test(matchedPagePath)) {
    let newValue = '';
    if (/src\/pages\/index(.tsx|.jsx?)$/.test(value)) {
      newValue = value.replace(/\.{2}\/src\/pages/, './pages/index');
    } else {
      const [, , pageName] = matchedPagePath.split('/');
      newValue = pageName ? `ice/${pageName}/${pageName}` : '';
    }

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
