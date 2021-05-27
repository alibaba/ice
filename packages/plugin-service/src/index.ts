import * as path from 'path';

export default async (api) => {
  const { applyMethod } = api;

  const srcPath = path.join(__dirname, '../templates');

  applyMethod('addPluginTemplate', srcPath);
  applyMethod('addExport', {
    source: './plugins/service/createService',
    exportName: 'createService',
    importSource: '$$ice/plugins/service/createService',
    exportDefault: 'createService',
  });
};
