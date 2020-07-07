import * as path from 'path';
import * as fse from 'fs-extra';
import * as ejs from 'ejs';
import Generator from './generator';

export default async (api) => {
  const { context, getValue, onHook, applyMethod, onGetWebpackConfig, modifyUserConfig } = api;
  const { rootDir, userConfig } = context;

  const targetPath = getValue('ICE_TEMP');
  const templatePath = path.join(__dirname, 'template');
  const appStoreTemplatePath = path.join(templatePath, 'appStore.ts.ejs');
  const pageStoreTemplatePath = path.join(templatePath, 'pageStore.ts.ejs');
  const pageStoresTemplatePath = path.join(templatePath, 'pageStores.ts.ejs');
  const typesTemplatePath = path.join(templatePath, 'types.ts.ejs');
  const projectType = getValue('PROJECT_TYPE');

  // set IStore to IAppConfig
  applyMethod('addIceAppConfigTypes', { source: './store/types', specifier: '{ IStore }', exportName: 'store?: IStore' });

  // render template/types.ts.ejs to .ice/store/types.ts
  const typesTemplateContent = fse.readFileSync(typesTemplatePath, 'utf-8');
  const typesTargetPath = path.join(targetPath, 'store', 'types.ts');
  const hasAppModels = fse.pathExistsSync(path.join(rootDir, 'src', 'models'));
  const content = ejs.render(typesTemplateContent, { hasAppModels });
  fse.ensureFileSync(typesTargetPath);
  fse.writeFileSync(typesTargetPath, content, 'utf-8');
  applyMethod('addIceTypesExport', { source: './store/types' });

  // add babel plugins for ice lazy
  const { configPath } = userConfig.router || {};
  const { mpa: isMpa } = userConfig;
  let { routesPath } = applyMethod('getRoutes', {
    rootDir,
    tempDir: targetPath,
    configPath,
    projectType,
    isMpa
  });

  if (isMpa) {
    const routesFile = `routes.${projectType}`;
    const pagesPath = path.join(rootDir, 'src', 'pages');
    const pages = applyMethod('getPages', rootDir);
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
          applyMethod
        }
      ]
    ]
  );

  onGetWebpackConfig(config => {
    config.resolve.alias.set('$ice/store', path.join(targetPath, 'store', 'index.ts'));
  });

  const gen = new Generator({
    appStoreTemplatePath,
    pageStoreTemplatePath,
    pageStoresTemplatePath,
    targetPath,
    rootDir,
    applyMethod,
    projectType
  });

  gen.render();
  onHook('before.start.run', async () => {
    applyMethod('watchFileChange', /models\/.*|model.*|pages\/\w+\/index(.jsx?|.tsx)/, () => {
      gen.render();
    });
  });
};

