import * as path from 'path';
import * as fse from 'fs-extra';

export default async function (api) {
  const { getValue, applyMethod, onGetWebpackConfig } = api;
  const templatePath = path.join(__dirname, '..', 'template');
  const distPath = path.join(getValue('ICE_TEMP'), 'request');

  // move template to .ice/request
  await fse.copy(templatePath, distPath);
  await fse.copy(path.join(__dirname, 'types'), path.join(distPath, 'types'));

  // .ice/index.ts:
  // export * from './request';
  // export * from './useRequest';
  applyMethod('addIceExport', { source: './request/request', exportName: 'request' });
  applyMethod('addIceExport', { source: './request/useRequest', exportName: 'useRequest' });

  // add iceTypes exports
  applyMethod('addIceAppConfigTypes', { source: './request/types', specifier: '{ IRequest }', exportName: 'request?: IRequest' });

  onGetWebpackConfig((config) => {
    // add alias for runtime.ts use $ice/createAxiosInstance
    config.resolve.alias.set('$ice/createAxiosInstance', path.join(distPath, 'createAxiosInstance.ts'));
  });
}
