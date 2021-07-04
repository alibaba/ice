import * as path from 'path';
import { IPlugin } from 'build-scripts';

const plugin: IPlugin = async ({ getValue, applyMethod, onGetWebpackConfig }): Promise<void> => {
  const exportName = 'logger';
  const distPath = path.join(getValue('TEMP_PATH'), 'plugins', exportName);
  applyMethod('addPluginTemplate', path.join(__dirname, `../${exportName}`));

  // add ice exports
  applyMethod('addExport', {
    source: `./plugins/${exportName}`,
    exportName,
    importSource: `$$ice/plugins/${exportName}`,
    exportDefault: exportName,
  });

  // add iceTypes exports
  applyMethod('addAppConfigTypes', { source: `../plugins/${exportName}/types`, specifier: '{ ILogger }', exportName: `${exportName}?: ILogger` });

  onGetWebpackConfig((config) => {
    // add alias for runtime.ts use $ice/logger
    config.resolve.alias.set('$ice/logger', distPath);
  });
};

export default plugin;
