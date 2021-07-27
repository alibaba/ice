import * as path from 'path';
import Generator from './generator';
import checkStoreExists from './utils/checkStoreExists';
import { getAppStorePath } from './utils/getPath';
import { getRouteFileType } from './utils/getFileType';

const { name: pluginName } = require('../package.json');

export default async (api: any) => {
  const { context, getValue, onHook, applyMethod, onGetWebpackConfig } = api;
  const { rootDir, userConfig } = context;

  // get mpa entries in src/pages
  const { mpa: isMpa, entry, store } = userConfig;

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
    routesPath = pagesName.map((pageName: string) => {
      const pagePath = path.join(rootDir, 'src', 'pages', pageName);
      const routesFileType = getRouteFileType(pagePath);
      return path.join(pagePath, `routes${routesFileType}`);
    });
  }

  onGetWebpackConfig((config: any) => {
    config.resolve.alias.set('$store', appStoreFile || path.join(tempPath, 'plugins', 'store', 'index.ts'));
    config.module
      .rule('replace-router-path')
      .enforce('post')
      .test((filePath: string) => routesPath.includes(filePath))
      .use('replace-router-path-loader')
      .loader(require.resolve(path.join(__dirname, 'replacePathLoader')))
      .options({
        alias: userConfig.alias,
        tempDir,
        applyMethod,
        pagesName,
        routesPath: Array.isArray(routesPath) ? routesPath : [routesPath],
        rootDir
      });
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
