import * as path from 'path';
import { Plugin } from 'vite';
import { formatPath } from '@builder/app-helpers';

const getPageName = (resolveId: string): { type: string; pageName: string; } => {
  const layoutRegExp = /src\/pages\/(\w+)\/Layout/;
  const pageRegExp = /src\/pages\/(\w+)(\/index)?(.(j|t)s(x)?)?$/;
  let type = '';
  if (resolveId.match(pageRegExp)) {
    type = 'page';
  } else if (resolveId.match(layoutRegExp)) {
    type = 'layout';
  }
  const [, pageName] = resolveId.match(pageRegExp) || resolveId.match(layoutRegExp) || [];
  return { type, pageName };
};

const vitePluginPageRedirect = (rootDir: string ,routesPaths: string[]): Plugin => {
  const formattedRoutes = routesPaths.map(formatPath);
  return {
    enforce: 'pre',
    name: 'vite-plugin-page-redirect',
    resolveId(id, importer) {
      if (formattedRoutes.includes(formatPath(importer))) {
        let importPath = id;
        // relative path
        if (/^(\.\/|\.{2}\/)/.test(importPath)) {
          importPath = formatPath(path.join(path.dirname(importer), importPath));
        }
        // if import path includes alias, it will be resolved as absolute path
        const { type, pageName } = getPageName(importPath);
        if (pageName && type) return path.join(rootDir, `/.ice/pages/${pageName}${type === 'layout' ? '/Layout' : ''}/index.tsx`);
      }
    },
  };
};

export default vitePluginPageRedirect;
