import * as path from 'path';
import * as fse from 'fs-extra';
import { IPlugin } from '@alib/build-scripts';

const plugin: IPlugin = async ({ getValue, applyMethod, onGetWebpackConfig }): Promise<void> => {
  const exportName = 'logger';
  const distPath = path.join(getValue('ICE_TEMP'), exportName);
  await fse.copy(path.join(__dirname, `../${exportName}`), distPath);
  await fse.copy(path.join(__dirname, './types'), path.join(distPath, 'types'));
  // add ice exports
  applyMethod('addIceExport', { source: `./${exportName}`, exportName });

  // add iceTypes exports
  applyMethod('addIceAppConfigTypes', { source: `./${exportName}/types`, specifier: '{ ILogger }', exportName: `${exportName}?: ILogger` });

  onGetWebpackConfig((config) => {
    // add alias for module.ts use $ice/logger
    config.resolve.alias.set('$ice/logger', distPath);
  });
};

export default plugin;
