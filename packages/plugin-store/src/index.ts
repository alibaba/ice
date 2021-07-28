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
  const { mpa: isMpa, entry, store } = userConfig;

  const tempPath = getValue('TEMP_PATH');
  const srcDir = isMpa ? 'src' : applyMethod('getSourceDir', entry);
  const srcPath = path.join(rootDir, srcDir);
  const tempDir = (path.basename(tempPath) || '').split('.')[1];  // ice
  const pagesName = applyMethod('getPages', rootDir, srcDir);

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
  const { configPath } = userConfig.router || {};
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
    const pagesPath = path.join(rootDir, 'src', 'pages');
    routesPath = pagesName.map((pageName: string) => {
      const pagePath = path.join(pagesPath, pageName);
      const routesFileType = getRouteFileType(pagePath);
      return path.join(pagePath, `routes${routesFileType}`);
    });
  }

  const babelPlugins = userConfig.babelPlugins || [];
  const replacePathBabelPlugin = [
    require.resolve('./babelPluginReplacePath'),
    {
      routesPath,
      alias: userConfig.alias,
      applyMethod,
      tempDir
    }
  ];

  // add vite plugin for redirect page component
  if (userConfig.vite) {
    modifyUserConfig('vite.plugins', (plugins: Plugin[] | undefined) => {
      return [vitePluginPageRedirect(routesPath), ...(plugins || [])];
    });
  }

  const loadableBabelPluginIndex = babelPlugins.indexOf('@loadable/babel-plugin');
  if (loadableBabelPluginIndex > -1) {
    // ReplacePathBabelPlugin will change the component path from original path to .ice/ dir
    // @loadable/babel-plugin will get the transformed path
    // so neet to ensure ReplacePathBabelPlugin is before @loadable/babel-plugin
    babelPlugins.splice(loadableBabelPluginIndex, 0, replacePathBabelPlugin);
  } else {
    babelPlugins.push(replacePathBabelPlugin);
  }

  modifyUserConfig('babelPlugins', [...babelPlugins]);

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
