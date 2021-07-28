import * as path from 'path';
import { Plugin } from 'vite';

const getPageName = (resolveId: string): { type: string; pageName: string; } => {
  const layoutRegExp = /src\/pages\/(\w+)\/Layout/;
  const pageRegExp = /src\/pages\/(\w+)(\/index)?(.(j|t)s(x)?)?/;
  let type = '';
  if (resolveId.match(pageRegExp)) {
    type = 'page';
  } else if (resolveId.match(layoutRegExp)) {
    type = 'layout';
  }
  const [, pageName] = resolveId.match(pageRegExp) || resolveId.match(layoutRegExp) || [];
  return { type, pageName };
};

const vitePluginPageRedirect = (rootDir: string): Plugin => {
  const routesRegExp = /src\/routes\.(j|t)s(x)?$/;
  return {
    enforce: 'pre',
    name: 'vite-plugin-page-redirect',
    resolveId(id, importer) {
      if (importer.match(routesRegExp)) {
        let importPath = id;
        // relative path
        if (/^(\.\/|\.{2}\/)/.test(importPath)) {
          importPath = path.join(rootDir, 'src', importPath);
        }
        // if import path includes alias, it will be resolved as absolute path
        const { type, pageName } = getPageName(importPath);
        if (pageName && type) return `/.ice/pages/${pageName}${type === 'layout' ? '/Layout' : ''}`;
      }
    },
  };
};

export default vitePluginPageRedirect;