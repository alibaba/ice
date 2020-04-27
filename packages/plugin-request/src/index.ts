import * as path from 'path';
import * as fse from 'fs-extra';

export default async function (api) {
  const { getValue, applyMethod, onGetWebpackConfig } = api;
  const srcPath = path.join(__dirname, '..', 'request');
  const distPath = path.join(getValue('ICE_TEMP'), 'request');

  // move requst to .ice/request
  await fse.copy(srcPath, distPath);
  await fse.copy(path.join(__dirname, 'types'), path.join(distPath, 'types'));
  // .ice/index.ts:
  // export * from './request';
  applyMethod('addIceExport', { source: './request/request', exportName: 'request' });
  applyMethod('addIceExport', { source: './request/useRequest', exportName: 'useRequest' });

  // add iceTypes exports
  applyMethod('addIceAppConfigTypes', { source: './request/types', specifier: '{ IRequest }', exportName: 'request?: IRequest' });

  onGetWebpackConfig((config) => {
    // add alias for module.ts use $ice/axiosInstance
    config.resolve.alias.set('$ice/axiosInstance', path.join(distPath, 'axiosInstance.ts'));
  });
}
