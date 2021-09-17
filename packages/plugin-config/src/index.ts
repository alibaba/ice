import * as path from 'path';
import { IPlugin } from '@alib/build-scripts';

const plugin: IPlugin = async (api): Promise<void> => {
  const { context, getValue, applyMethod } = api;
  const { command, rootDir } = context;
  const configFilePattern = 'src/config';

  async function generateConfig() {
    const configFile = applyMethod('getSourceFile', configFilePattern, rootDir);
    const distPath =  path.join(getValue('TEMP_PATH'), 'config.ts');
    const templatePath = path.join(__dirname, './template/config.ts.ejs');
    applyMethod('addRenderFile', templatePath, distPath, { hasConfig: !!configFile });
    const exportName = 'config, APP_MODE';
    applyMethod('removeExport', exportName);
    applyMethod('addExport', {
      source: './config',
      exportName,
      specifier: '{ config, APP_MODE }',
      importSource: '$$framework/config',
      exportMembers: ['config', 'APP_MODE'],
    });
  }

  generateConfig();
  if (command === 'start') {
    // watch folder config file is remove or added
    applyMethod('watchFileChange', configFilePattern, async (event: string) => {
      if (event === 'unlink' || event === 'add') {
        await generateConfig();
      }
    });
  }
};

export default plugin;
