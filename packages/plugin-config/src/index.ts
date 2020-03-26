import * as path from 'path';
import * as fse from 'fs-extra';
import { IPlugin } from '@alib/build-scripts';

const plugin: IPlugin = async (api): Promise<void> => {
  const { context, getValue, applyMethod } = api;
  const { command, rootDir } = context;

  const configFile = `src/config.${getValue('PROJECT_TYPE')}`;

  async function generateConfig() {
    const exportName = 'config';
    const filePath = path.join(rootDir,configFile);
    const distPath =  path.join(getValue('ICE_TEMP'), 'config.ts');
    if (fse.existsSync(filePath)) {
      const srcPath = path.join(__dirname, '..', 'config', 'index.ts');

      await fse.copy(srcPath, distPath);
      // add to ice exports
      applyMethod('addIceExport', { source: `./config`, exportName });
    } else {
      // remove config file
      applyMethod('removeIceExport', exportName);
      fse.removeSync(distPath);
    }
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
