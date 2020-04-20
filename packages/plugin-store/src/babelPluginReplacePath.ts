import * as path from 'path';

module.exports = ({ types: t }, { routesPath, alias }) => {
  const regex = /src\/pages\/\w+(.tsx|.jsx)?(\/index(.tsx|.jsx)?)?/;
  const isConventionRouting = /\.ice\/routes\.ts/.test(routesPath);

  return {
    visitor: {
      ImportDeclaration(nodePath, state) {
        const isRoutesFile = (routesPath === state.filename);
        if (isRoutesFile) {
          let value = nodePath.node.source.value;
          if (typeof value === 'string') {
            // 约定式路由
            // e.g: import Home from '../src/pages/Home/index.tsx';
            if (isConventionRouting && value.startsWith('../src/pages')) {
              const [, , , pageName] = value.split('/');
              // replace to: import Home from './pages/Home/Home'
              value = `./pages/${pageName}/${pageName}`;
              replaceWith(t, nodePath, value);
            } else {
              // 配置式路由
              // default alias: import Home from '@/pages/Home';
              // custom alias: import Home from '$pages/Home';
              // relative path: import Home from '../pages/Home'
              const matchedPagePath = matchRelativePath(routesPath, value) || matchAliasPath(alias, value);
              if (matchedPagePath && regex.test(matchedPagePath)) {
                const [, , pageName] = matchedPagePath.split('/');
                // replace to: import Home from 'ice/Home/Home'
                value = `ice/${pageName}/${pageName}`;
                replaceWith(t, nodePath, value);
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
              let value = args[i].value;
              if (typeof value === 'string') {
                // 约定式路由
                // e.g: const Home = lazy(() => import(/* webpackChunkName: 'Home' */ '../src/pages/Home/index.tsx'));
                if (isConventionRouting && value.startsWith('../src/pages')) {
                  const [, , , pageName] = value.split('/');
                  // replace to: import Home from './pages/Home/Home'
                  value = `./pages/${pageName}/${pageName}`;
                  args[i].value = value;
                } else {
                  // 配置式路由
                  // default alias: const Home = lazy(() => import('@/pages/Home'));
                  // custom alias: const Home = lazy(() => import('$pages/home));
                  // relative path: const Home = lazy(() => import('../pages/Home'));
                  const matchedPagePath = matchRelativePath(routesPath, value) || matchAliasPath(alias, value);
                  if (matchedPagePath && regex.test(matchedPagePath)) {
                    const [, , pageName] = matchedPagePath.split('/');
                    // replace to: const Home =lazy (() => import('ice/Home/Home'));
                    value = `ice/${pageName}/${pageName}`;
                    args[i].value = value;
                  }
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

// enum alias:
//  case1: { "@": "./src", "@pages": "./src/pages" }
//  case2: { "@src": "./src", "@pages": "./src/pages" }
//  case3: { "@": "./src", "@/pages": "./src/pages" }
function matchAliasPath(alias: IAlias, value: string): string {
  let aliasPath = '';
  // use default alias
  if (!Object.keys(alias).length) {
    alias['@'] = 'src';
  }
  // use custom alias
  Object.keys(alias).forEach(currKey => {
    if (value.startsWith(currKey)) {
      const [, ...args] = value.split(currKey);
      const currAliasPath = path.join(alias[currKey], ...args);
      if (currAliasPath.includes('src/pages')) {
        aliasPath = currAliasPath;
      }
    }
  });
  return aliasPath;
}

function matchRelativePath(routesPath: string, value: string) {
  let relativePath = '';
  if (/^(\.\/|\.{2}\/)/.test(value)) {
    relativePath = path.relative(process.cwd(), path.join(routesPath, '..', value));
  }
  return relativePath;
}

function replaceWith(t, nodePath, value) {
  nodePath.replaceWith(
    t.ImportDeclaration(
      nodePath.node.specifiers,
      t.stringLiteral(value)
    )
  );
}
