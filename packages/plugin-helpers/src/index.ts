import * as path from 'path';

export default async function ({
  getValue,
  applyMethod,
  onGetWebpackConfig,
}) {
  const templatePath = path.join(__dirname, '../helpers');
  const sourcePath = './plugins/helpers';
  const distPath = path.join(getValue('TEMP_PATH'), sourcePath);

  onGetWebpackConfig((config: any) => {
    // add alias for runtime.ts use $ice/helpers
    config.resolve.alias.set('$ice/helpers', distPath);
  });

  // mv helpers to .ice/plugins/helpers
  applyMethod('addPluginTemplate', templatePath);

  // .ice/index.ts:
  // export * from './plugins/helpers';
  applyMethod('addExport', {
    source: sourcePath,
    exportName: 'helpers',
    importSource: '$$ice/plugins/helpers',
    exportDefault: 'helpers',
  });
}
