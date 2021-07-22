import * as path from 'path';

export default async function (api) {
  const { getValue, applyMethod, onGetWebpackConfig } = api;
  const templatePath = path.join(__dirname, '..', 'template');
  const distPath = path.join(getValue('TEMP_PATH'), 'plugins' ,'request');

  applyMethod('addPluginTemplate', templatePath);

  // .ice/index.ts:
  // export * from './request';
  // export * from './useRequest';
  applyMethod('addExport', {
    source: './plugins/request/request',
    exportName: 'request',
    importSource: '$$ice/plugins/request/request',
    exportDefault: 'request',
  });

  applyMethod('addExport', {
    source: './plugins/request/useRequest',
    exportName: 'useRequest',
    importSource: '$$ice/plugins/request/useRequest',
    exportDefault: 'useRequest',
  });

  // add iceTypes exports
  applyMethod('addAppConfigTypes', { source: '../plugins/request/types', specifier: '{ IRequest }', exportName: 'request?: IRequest' });

  onGetWebpackConfig((config) => {
    // add alias for runtime.ts use $ice/createAxiosInstance
    config.resolve.alias.set('$ice/createAxiosInstance', path.join(distPath, 'createAxiosInstance.ts'));
  });
}
