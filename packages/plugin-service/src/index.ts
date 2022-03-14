import * as path from 'path';

export default async (api) => {
  const { applyMethod } = api;

  const templatePath = path.join(__dirname, '../templates');

  applyMethod('addPluginTemplate', templatePath);
  applyMethod('addExport', {
    source: './plugins/service/createService',
    exportName: 'createService',
    importSource: '$$ice/plugins/service/createService',
    exportDefault: 'createService',
  });
};
