import * as path from 'path';
import * as chalk from 'chalk';
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
  const pagesName: string[] = applyMethod('getPages', srcPath);

  const storeExists = checkStoreExists(srcPath, pagesName);

  if (!storeExists) {
    onHook('before.start.run', () => {
      applyMethod('watchFileChange', /store.*/, (event: string, filePath: string) => {
        if (event === 'add') {
          // restart WDS
          console.log('\n');
          console.log(chalk.magenta(`${filePath} has been created`));
          console.log(chalk.magenta('restart dev server'));
          process.send({ type: 'RESTART_DEV' });
        }
      });
    });

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

  let routesPaths;
  if (isMpa) {
    routesPaths = pagesName.map((pageName: string) => {
      const pagePath = path.join(rootDir, 'src', 'pages', pageName);
      const routesFileType = getRouteFileType(pagePath);
      return path.join(pagePath, `routes${routesFileType}`);
    });
  } else {
    const routes = applyMethod('getRoutes', {
      rootDir,
      tempPath,
      configPath,
      projectType,
      isMpa,
      srcDir
    });
    routesPaths = [routes.routesPath];
  }

  // add vite plugin for redirect page component
  if (vite) {
    modifyUserConfig('vite.plugins', [vitePluginPageRedirect(rootDir, routesPaths)], { deepmerge: true });
  }

  if (swc) {
    onGetWebpackConfig((config: any) => {
      config.module
        .rule('replace-router-path')
        // ensure that replace-router-path-loader is before babel-loader
        // @loadable/babel-plugin will transform the router paths which replace-router-path-loader couldn't transform
        .before('babel-loader')
        .test((filePath: string) => routesPaths.includes(filePath))
        .use('replace-router-path-loader')
        .loader(require.resolve(path.join(__dirname, 'replacePathLoader')))
        .options({
          alias,
          tempDir,
          applyMethod,
          routesPaths,
          rootDir,
          srcPath
        });
    });
  } else {
    const replacePathBabelPlugin = [
      require.resolve('./babelPluginReplacePath'),
      {
        routesPaths,
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
    config.merge({
      cache: {
        type: 'filesystem',
        version: 'store'
      }
    });
    console.log('config===>', config.toConfig());
  });

  const gen = new Generator({
    tempPath,
    applyMethod,
    srcPath,
    disableResetPageState: !!store?.disableResetPageState
  });

  gen.render();

  onHook('before.start.run', () => {
    applyMethod('watchFileChange', /models\/.*|model.*|store.*|pages\/\w+\/index(.jsx?|.tsx)/, (event: string) => {
      if (event === 'add' || event === 'unlink') {
        gen.render(true);
      }
    });
  });
};
