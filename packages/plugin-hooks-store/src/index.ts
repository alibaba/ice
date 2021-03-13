import { IPlugin } from '@alib/build-scripts';
import * as path from 'path';
import Generator from './generator';
import { getAppStorePath } from './utils/getPath';

const plugin: IPlugin = ({ applyMethod, getValue, context, onHook, onGetWebpackConfig, modifyUserConfig }) => {

  const { rootDir, userConfig } = context;
  const { mpa: isMpa, entry } = userConfig;
  const targetPath = getValue('TEMP_PATH');
  const tempDir = (path.basename(targetPath) || '').split('.')[1];
  const projectType = getValue('PROJECT_TYPE');
  const templatePath = path.join(__dirname, 'template');
  const typesTemplatePath = path.join(templatePath, 'types.ts.ejs');
  const srcDir = isMpa ? 'src' : applyMethod('getSourceDir', entry);
  const pages = applyMethod('getPages', rootDir, srcDir);

  const appStoreFile = applyMethod('formatPath', getAppStorePath({ rootDir, srcDir, projectType }));

  applyMethod('addExport', {
    source: '@ice/hooks-store',
    specifier: '{ createStore as createHooksStore }',
    importSource: '@ice/hooks-store',
    exportName: 'createHooksStore',
    exportMembers: ['createHooksStore'],
  });

  applyMethod('addAppConfigTypes', { source: './store/types', specifier: '{ IStore }', exportName: 'store?: IStore' });

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
    config.resolve.alias.set('$store', appStoreFile);
  });

  const gen = new Generator({
    targetPath,
    rootDir,
    applyMethod,
    projectType,
    srcDir,
    typesTemplatePath
  });

  gen.render();
  onHook('before.start.run', async () => {
    applyMethod('watchFileChange', /store.*|pages\/\w+\/store.*/, () => {
      gen.render();
    });
  });
};

export default plugin;
