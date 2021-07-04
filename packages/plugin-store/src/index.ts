import * as path from 'path';
import * as fse from 'fs-extra';
import Generator from './generator';
import checkStoreAndModelExist from './utils/checkStoreAndModelExist';
import { getAppStorePath } from './utils/getPath';
import checkStoreAndModelFileExist from './utils/checkStoreAndModelFileExist';

const { name: pluginName } = require('../package.json');

export default async (api) => {
  const { context, getValue, onHook, applyMethod, onGetWebpackConfig, modifyUserConfig } = api;
  const { rootDir, userConfig } = context;

  // get mpa entries in src/pages
  const { mpa: isMpa, entry, store } = userConfig;

  const targetPath = getValue('TEMP_PATH');
  const srcDir = isMpa ? 'src' : applyMethod('getSourceDir', entry);
  const tempDir = (path.basename(targetPath) || '').split('.')[1];
  const templatePath = path.join(__dirname, 'template');
  const appStoreTemplatePath = path.join(templatePath, 'appStore.ts.ejs');
  const pageStoreTemplatePath = path.join(templatePath, 'pageStore.ts.ejs');
  const pageStoresTemplatePath = path.join(templatePath, 'pageStores.ts.ejs');
  const typesTemplatePath = path.join(templatePath, 'types.ts.ejs');
  const projectType = getValue('PROJECT_TYPE');
  const pages = applyMethod('getPages', rootDir, srcDir);

  const storeAndModelExists = checkStoreAndModelExist({ rootDir, srcDir, projectType, applyMethod });
  if (!storeAndModelExists) {
    applyMethod('addDisableRuntimePlugin', pluginName);
    return;
  }

  checkStoreAndModelFileExist({ rootDir, srcDir, projectType, pages });

  const appStoreFile = applyMethod('formatPath', getAppStorePath({ rootDir, srcDir, projectType }));
  const existsAppStoreFile = fse.pathExistsSync(appStoreFile);

  applyMethod('addExport', {
    source: '@ice/store',
    specifier: '{ createStore }',
    exportName: 'createStore',
    importSource: '@ice/store',
    exportMembers: ['createStore'],
  });

  if (!existsAppStoreFile) {
    // set IStore to IAppConfig
    applyMethod('addAppConfigTypes', { source: '../plugins/store/types', specifier: '{ IStore }', exportName: 'store?: IStore' });
  }

  // add babel plugins for ice lazy
  const { configPath } = userConfig.router || {};

  let { routesPath } = applyMethod('getRoutes', {
    rootDir,
    tempDir: targetPath,
    configPath,
    projectType,
    isMpa,
    srcDir
  });

  if (isMpa) {
    const routesFile = `routes.${projectType}`;
    const pagesPath = path.join(rootDir, 'src', 'pages');
    const pagesRoutePath = pages.map(pageName => {
      return path.join(pagesPath, pageName, routesFile);
    });
    routesPath = pagesRoutePath;
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

  onGetWebpackConfig(config => {
    config.module.rule('appJSON')
      .test(/app\.json$/)
      .use('page-source-loader')
      .loader(require.resolve('./pageSourceLoader'))
      .options({
        targetPath
      });
    config.resolve.alias.set('$store', existsAppStoreFile ? appStoreFile : path.join(targetPath, 'plugins', 'store', 'index.ts'));
  });

  const gen = new Generator({
    appStoreTemplatePath,
    pageStoreTemplatePath,
    pageStoresTemplatePath,
    typesTemplatePath,
    targetPath,
    rootDir,
    applyMethod,
    projectType,
    srcDir,
    resetPageState: store && store.resetPageState
  });

  gen.render();
  onHook('before.start.run', async () => {
    applyMethod('watchFileChange', /models\/.*|model.*|store.*|pages\/\w+\/index(.jsx?|.tsx)/, () => {
      gen.render();
    });
  });
};
