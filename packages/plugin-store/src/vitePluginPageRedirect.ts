import { Plugin } from 'vite';

const getPageName = (resolveId: string): string => {
  const layoutRegExp = /src\/pages\/(\w+)\/Layout/;
  const pageRegExp = /src\/pages\/(\w+)(\/index)?(.(j|t)s(x)?)?/;
  const [, pageName] = resolveId.match(pageRegExp) || resolveId.match(layoutRegExp) || [];
  return pageName;
};

const vitePluginPageRedirect = (): Plugin => {
  const routesRegExp = /src\/routes\.(j|t)s(x)?$/;
  return {
    enforce: 'pre',
    name: 'vite-plugin-page-redirect',
    resolveId(id, importer) {
      if (importer.match(routesRegExp)) {
        const pageName = getPageName(id);
        if (pageName) return `/.ice/pages/${pageName}`;
      }
    },
  };
};

export default vitePluginPageRedirect;