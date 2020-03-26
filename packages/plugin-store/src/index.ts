import * as path from 'path';
import * as fse from 'fs-extra';
import Generator from './generator';

export default async (api) => {
  const { context, getValue, onHook, applyMethod, onGetWebpackConfig } = api;
  const { rootDir, command } = context;

  const targetPath = getValue('ICE_TEMP');
  const templatePath = path.join(__dirname, 'template');
  const modelsTemplatePath = path.join(templatePath, 'models.ts.ejs');
  const pageModelsTemplatePath = path.join(templatePath, 'pageModels.ts.ejs');
  const projectType = getValue('PROJECT_TYPE');

  await fse.copy(path.join(__dirname, '..', 'src/types/index.ts'), path.join(targetPath, './types/store.ts'));
  applyMethod('addIceTypesExport', { source: './types/store', specifier: '{ IStore }', exportName: 'store?: IStore' });

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

    config.resolve.alias.set('$ice/appModels', path.join(targetPath, 'appModels.ts'));
    config.resolve.alias.set('$ice/pageModels', path.join(targetPath, 'pageModels.ts'));
  });

  const gen = new Generator({
    modelsTemplatePath,
    pageModelsTemplatePath,
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

