import * as path from 'path';
import * as fse from 'fs-extra';
import Generator from './generator';

export default async (api) => {
  const { context, getValue, onHook, applyMethod, onGetWebpackConfig } = api;
  const { rootDir, command } = context;

  const targetPath = getValue('ICE_TEMP');
  const templatePath = path.join(__dirname, 'template');
  const appStoreTemplatePath = path.join(templatePath, 'appStore.ts.ejs');
  const pageStoreTemplatePath = path.join(templatePath, 'pageStore.ts.ejs');
  const pageStoresTemplatePath = path.join(templatePath, 'pageStores.ts.ejs');
  const projectType = getValue('PROJECT_TYPE');

  await fse.copy(path.join(__dirname, '..', 'src/types'), path.join(targetPath, './store'));
  // TODO: 考虑合并为一个
  applyMethod('addIceTypesExport', { source: './store', specifier: '{ IStore }', exportName: 'store?: IStore' });
  applyMethod('addIceTypesExport', { source: './store/icestore' });

  onGetWebpackConfig(config => {
    if (command === 'build') {
      config.optimization.minimizer('TerserPlugin').tap(([args]) => [
        {
          ...args,
          // eslint-disable-next-line
          terserOptions: { ...args.terserOptions, keep_classnames: true, keep_fnames: true }
        },
      ]);
    }

    config.resolve.alias.set('$ice/appStore', path.join(targetPath, 'appStore.ts'));
    config.resolve.alias.set('$ice/pageStores', path.join(targetPath, 'pageStores.ts'));
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
    applyMethod('watchFileChange', /models\/.*|model.*/, () => {
      gen.render();
    });
  });
};

