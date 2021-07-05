import * as path from 'path';
import * as fse from 'fs-extra';
import { IPlugin } from 'build-scripts';

const plugin: IPlugin = async (api): Promise<void> => {
  const { context, getValue, applyMethod } = api;
  const { command, rootDir } = context;

  const configFile = `src/config.${getValue('PROJECT_TYPE')}`;

  async function generateConfig() {
    const filePath = path.join(rootDir,configFile);
    const templatePath = path.join(__dirname, './template/index.ts.ejs');
    applyMethod('addPluginTemplate', templatePath, { hasConfig: fse.existsSync(filePath)});
    applyMethod('addExport', {
      source: './plugins/config',
      exportName: 'config, APP_MODE',
      specifier: '{ config, APP_MODE }',
      importSource: '$$framework/plugins/config',
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
