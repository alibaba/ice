import * as path from 'path';
import { IPlugin } from 'build-scripts';

const plugin: IPlugin = async (api): Promise<void> => {
  const { context, applyMethod } = api;
  const { command, rootDir } = context;
  const configFilePattern = 'src/config';

  async function generateConfig() {
    const configFile = applyMethod('getSourceFile', configFilePattern, rootDir);
    const templatePath = path.join(__dirname, './template/index.ts.ejs');
    applyMethod('addPluginTemplate', templatePath, { hasConfig: !!configFile });
    const exportName = 'config, APP_MODE';
    applyMethod('removeExport', exportName);
    applyMethod('addExport', {
      source: './plugins/config',
      exportName,
      specifier: '{ config, APP_MODE }',
      importSource: '$$framework/plugins/config',
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
