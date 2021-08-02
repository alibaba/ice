import * as path from 'path';
import Generator from './generator';
import checkStoreExists from './utils/checkStoreExists';
import { getAppStorePath } from './utils/getPath';
import { getRouteFileType } from './utils/getFileType';
import vitePluginPageRedirect from './vitePluginPageRedirect';

const { name: pluginName } = require('../package.json');

export default async (api: any) => {
  const { context, getValue, onHook, applyMethod, onGetWebpackConfig, modifyUserConfig } = api;
  const { rootDir, userConfig } = context;

  // get mpa entries in src/pages
  const { mpa: isMpa, entry, store, swc, alias, vite, router, babelPlugins = [] } = userConfig;

  const tempPath = getValue('TEMP_PATH');
  const srcDir = isMpa ? 'src' : applyMethod('getSourceDir', entry);
  const srcPath = path.join(rootDir, srcDir);
  const tempDir = (path.basename(tempPath) || '');  // .ice
  const pagesName: string[] = applyMethod('getPages', rootDir, srcDir);

  const storeExists = checkStoreExists(srcPath, pagesName);
  if (!storeExists) {
    applyMethod('addDisableRuntimePlugin', pluginName);
    return;
  }

  const appStoreFile = applyMethod('formatPath', getAppStorePath(srcPath));

  applyMethod('addExport', {
    source: '@ice/store',
    specifier: '{ createStore }',
    exportName: 'createStore',
    importSource: '@ice/store',
    exportMembers: ['createStore'],
  });

  if (!appStoreFile) {
    // set IStore to IAppConfig
    applyMethod('addAppConfigTypes', { source: '../plugins/store/types', specifier: '{ IStore }', exportName: 'store?: IStore' });
  }

  // add babel plugins for ice lazy
  const { configPath } = router || {};
  // TODO: remove PROJECT_TYPE
  const projectType = getValue('PROJECT_TYPE');
  let { routesPath } = applyMethod('getRoutes', {
    rootDir,
    tempPath,
    configPath,
    projectType,
    isMpa,
    srcDir
  });

  if (isMpa) {
    routesPath = pagesName.map((pageName: string) => {
      const pagePath = path.join(rootDir, 'src', 'pages', pageName);
      const routesFileType = getRouteFileType(pagePath);
      return path.join(pagePath, `routes${routesFileType}`);
    });
  }
  // add vite plugin for redirect page component
  if (vite) {
    modifyUserConfig('vite.plugins', (plugins: Plugin[] | undefined) => {
      return [vitePluginPageRedirect(rootDir, routesPath), ...(plugins || [])];
    });
  }

  if (swc) {
    onGetWebpackConfig((config: any) => {
      config.module
        .rule('replace-router-path')
        // ensure that replace-router-path-loader is before babel-loader
        // @loadable/babel-plugin will transform the router paths which replace-router-path-loader couldn't transform
        .before('babel-loader')
        .test((filePath: string) => routesPath.includes(filePath))
        .use('replace-router-path-loader')
        .loader(require.resolve(path.join(__dirname, 'replacePathLoader')))
        .options({
          alias,
          tempDir,
          applyMethod,
          pagesName,
          routesPath: Array.isArray(routesPath) ? routesPath : [routesPath],
          rootDir
        });
    });
  } else {
    const replacePathBabelPlugin = [
      require.resolve('./babelPluginReplacePath'),
      {
        routesPath,
        alias,
        applyMethod,
        tempDir,
        rootDir
      }
    ];
    const loadableBabelPluginIndex = babelPlugins.indexOf('@loadable/babel-plugin');
    if (loadableBabelPluginIndex > -1) {
      // ensure ReplacePathBabelPlugin is before @loadable/babel-plugin
      // @loadable/babel-plugin will transform the router paths which babelPluginReplacePath couldn't transform
      babelPlugins.splice(loadableBabelPluginIndex, 0, replacePathBabelPlugin);
    } else {
      babelPlugins.push(replacePathBabelPlugin);
    }
    modifyUserConfig('babelPlugins', [...babelPlugins]);
  }

  onGetWebpackConfig((config: any) => {
    config.resolve.alias.set('$store', appStoreFile || path.join(tempPath, 'plugins', 'store', 'index.ts'));
  });

  const gen = new Generator({
    tempPath,
    applyMethod,
    srcPath,
    pagesName,
    disableResetPageState: !!store?.disableResetPageState
  });

  gen.render();
  onHook('before.start.run', async () => {
    applyMethod('watchFileChange', /models\/.*|model.*|store.*|pages\/\w+\/index(.jsx?|.tsx)/, () => {
      gen.render();
    });
  });
};
