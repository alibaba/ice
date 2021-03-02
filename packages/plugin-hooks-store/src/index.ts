import { IPlugin } from '@alib/build-scripts';
import * as path from 'path';
import Generator from './generator';

const plugin: IPlugin = ({ applyMethod, getValue, context, onHook }) => {
  applyMethod('addExport', {
    source: '@ice/hooks-store',
    specifier: '{ createStore as createHooksStore }',
    importSource: '@ice/hooks-store',
    exportName: 'createHooksStore',
    exportMembers: ['createHooksStore'],
  });

  const templatePath = path.join(__dirname, 'template');
  const appHooksStoreTemplatePath = path.join(templatePath, 'appStore.ts.ejs');
  const pageHooksStoreTemplatePath = path.join(templatePath, 'pageStore.ts.ejs');
  const targetPath = getValue('TEMP_PATH');
  const projectType = getValue('PROJECT_TYPE');
  const { rootDir, userConfig } = context;
  const { mpa: isMpa, entry } = userConfig;
  const srcDir = isMpa ? 'src' : applyMethod('getSourceDir', entry);

  const gen = new Generator({
    appHooksStoreTemplatePath,
    pageHooksStoreTemplatePath,
    targetPath,
    rootDir,
    applyMethod,
    projectType,
    srcDir
  });

  gen.render();
  onHook('before.start.run', async () => {
    applyMethod('watchFileChange', /hooks\/.*|hook.*|pages\/\w+\/index(.jsx?|.tsx)/, () => {
      gen.render();
    });
  });
};

export default plugin;
