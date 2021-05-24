import * as path from 'path';
import * as fse from 'fs-extra';
import { IPlugin } from 'build-scripts';

const plugin: IPlugin = async ({ getValue, applyMethod, onGetWebpackConfig }): Promise<void> => {
  const exportName = 'logger';
  const distPath = path.join(getValue('TEMP_PATH'), exportName);
  await fse.copy(path.join(__dirname, `../${exportName}`), distPath);
  await fse.copy(path.join(__dirname, './types'), path.join(distPath, 'types'));
  // add ice exports
  applyMethod('addExport', {
    source: `./${exportName}`,
    exportName,
    importSource: `$$ice/${exportName}`,
    exportDefault: exportName,
  });

  // add iceTypes exports
  applyMethod('addAppConfigTypes', { source: `./${exportName}/types`, specifier: '{ ILogger }', exportName: `${exportName}?: ILogger` });

  onGetWebpackConfig((config) => {
    // add alias for runtime.ts use $ice/logger
    config.resolve.alias.set('$ice/logger', distPath);
  });
};

export default plugin;
