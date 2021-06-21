import * as path from 'path';
import * as fse from 'fs-extra';
import { IPlugin } from 'build-scripts';

const plugin: IPlugin = async (api): Promise<void> => {
  const { context, getValue, applyMethod } = api;
  const { command, rootDir } = context;

  const configFile = `src/config.${getValue('PROJECT_TYPE')}`;

  async function generateConfig() {
    const filePath = path.join(rootDir,configFile);
    const distPath =  path.join(getValue('TEMP_PATH'), 'config.ts');
    const templatePath = path.join(__dirname, './template/config.ts.ejs');
    applyMethod('addRenderFile', templatePath, distPath, { hasConfig: fse.existsSync(filePath)});
    applyMethod('addExport', {
      source: './config',
      exportName: 'config, APP_MODE',
      specifier: '{ config, APP_MODE }',
      importSource: '$$framework/config',
      exportMembers: ['config', 'APP_MODE'],
    });
  }

  generateConfig();
  if (command === 'start') {
    // watch folder config file is remove or added
    applyMethod('watchFileChange', configFile, async (event: string) => {
      if (event === 'unlink' || event === 'add') {
        await generateConfig();
      }
    });
  }
};

export default plugin;
