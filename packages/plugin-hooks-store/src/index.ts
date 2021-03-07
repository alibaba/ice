import { IPlugin } from '@alib/build-scripts';
import * as path from 'path';
import * as fse from 'fs-extra';
import Generator from './generator';
import { getAppHooksStorePath } from './utils/getPath';

const plugin: IPlugin = ({ applyMethod, getValue, context, onHook, onGetWebpackConfig, modifyUserConfig }) => {

  const { rootDir, userConfig } = context;
  const { mpa: isMpa, entry } = userConfig;
  const targetPath = getValue('TEMP_PATH');
  const tempDir = (path.basename(targetPath) || '').split('.')[1];
  const projectType = getValue('PROJECT_TYPE');

  const srcDir = isMpa ? 'src' : applyMethod('getSourceDir', entry);
  const pages = applyMethod('getPages', rootDir, srcDir);

  const appHooksStoreFile = applyMethod('formatPath', getAppHooksStorePath({ rootDir, srcDir, projectType }));
  const existsAppHooksStoreFile = fse.pathExistsSync(appHooksStoreFile);

  applyMethod('addExport', {
    source: '@ice/hooks-store',
    specifier: '{ createStore as createHooksStore }',
    importSource: '@ice/hooks-store',
    exportName: 'createHooksStore',
    exportMembers: ['createHooksStore'],
  });

  // add babel plugins for ice lazy
  // @ts-ignore
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

  modifyUserConfig('babelPlugins',
    [
      ...(userConfig.babelPlugins as [] || []),
      [
        require.resolve('./babelPluginReplacePath'),
        {
          routesPath,
          alias: userConfig.alias,
          applyMethod,
          tempDir
        }
      ]
    ]
  );

  onGetWebpackConfig(config => {
    config.module.rule('appJSON')
      .test(/app\.json$/)
      .use('page-source-loader')
      .loader(require.resolve('./pageSourceLoader'))
      .options({
        targetPath
      });
    config.resolve.alias.set('$hooksStore', existsAppHooksStoreFile ? appHooksStoreFile : path.join(targetPath, 'hooksStore', 'index.ts'));
  });

  const gen = new Generator({
    targetPath,
    rootDir,
    applyMethod,
    projectType,
    srcDir
  });

  gen.render();
  onHook('before.start.run', async () => {
    applyMethod('watchFileChange', /hooksStore.*|pages\/\w+\/hooksStore.*/, () => {
      gen.render();
    });
  });
};

export default plugin;
