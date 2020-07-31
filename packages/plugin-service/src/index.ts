import * as path from 'path';
import * as fse from 'fs-extra';

export default async (api) => {
  const { getValue, applyMethod } = api;

  const srcPath = path.join(__dirname, 'service');
  const distPath = path.join(getValue('ICE_TEMP'), 'service');

  // move service to .ice/service
  await fse.copy(srcPath, distPath);
  applyMethod('addExport', { source: './service/createService', exportName: 'createService' });
};

