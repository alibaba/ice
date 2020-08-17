import * as path from 'path';
import * as fse from 'fs-extra';
import * as ejs from 'ejs';
import Generator from './generator';

export default async (api) => {
  const { context, getValue, onHook, applyMethod, onGetWebpackConfig, modifyUserConfig } = api;
  const { rootDir, userConfig } = context;

  const targetPath = getValue('TEMP_PATH');
  const templatePath = path.join(__dirname, 'template');
  const appStoreTemplatePath = path.join(templatePath, 'appStore.ts.ejs');
  const pageStoreTemplatePath = path.join(templatePath, 'pageStore.ts.ejs');
  const pageStoresTemplatePath = path.join(templatePath, 'pageStores.ts.ejs');
  const typesTemplatePath = path.join(templatePath, 'types.ts.ejs');
  const projectType = getValue('PROJECT_TYPE');

  // set IStore to IAppConfig
  applyMethod('addAppConfigTypes', { source: './store/types', specifier: '{ IStore }', exportName: 'store?: IStore' });

  // render template/types.ts.ejs to .ice/store/types.ts or .rax/store/types.ts
  const typesTemplateContent = fse.readFileSync(typesTemplatePath, 'utf-8');
  const typesTargetPath = path.join(targetPath, 'store', 'types.ts');
  const hasAppModels = fse.pathExistsSync(path.join(rootDir, 'src', 'models'));
  const content = ejs.render(typesTemplateContent, { hasAppModels });
  fse.ensureFileSync(typesTargetPath);
  fse.writeFileSync(typesTargetPath, content, 'utf-8');
  applyMethod('addTypesExport', { source: './store/types' });

  const { mpa: isMpa, entry } = userConfig;
  const srcDir = applyMethod('getSourceDir', entry);

  // Get framework from plugin-core
  const framework = getValue('FRAMEWORK');
  const isRax = framework === 'rax';

  if (isRax) {
    onGetWebpackConfig(config => {
      config.module.rule('appJSON')
        .test(/app\.json$/)
        .use('page-source-loader')
        .loader(require.resolve('./pageSourceLoader'))
        .options({
          targetPath
        });

      // Set alias to run @ice/store
      config.resolve.alias
        .set('$store', path.join(targetPath, 'store', 'index.ts'))
        .set('react-redux', require.resolve('rax-redux'))
        .set('react', path.join(rootDir, 'node_modules', 'rax/lib/compat'));;
    });
  } else {
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
      const pages = applyMethod('getPages', rootDir, srcDir);
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
      config.resolve.alias.set('$store', path.join(targetPath, 'store', 'index.ts'));
    });
  }

  const gen = new Generator({
    appStoreTemplatePath,
    pageStoreTemplatePath,
    pageStoresTemplatePath,
    targetPath,
    rootDir,
    applyMethod,
    projectType,
    isRax,
    srcDir
  });

  gen.render();
  onHook('before.start.run', async () => {
    applyMethod('watchFileChange', /models\/.*|model.*|pages\/\w+\/index(.jsx?|.tsx)/, () => {
      gen.render();
    });
  });
};

