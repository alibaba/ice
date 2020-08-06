import * as path from 'path';
import * as fse from 'fs-extra';

export default async function ({
  getValue,
  applyMethod,
  onGetWebpackConfig,
}) {
  const srcPath = path.join(__dirname, '../helpers');
  const distPath = path.join(getValue('ICE_TEMP'), 'helpers');

  onGetWebpackConfig((config: any) => {
    // add alias for runtime.ts use $ice/helpers
    config.resolve.alias.set('$ice/helpers', distPath);
  });

  // mv helpers to .ice/helpers
  await fse.copy(srcPath, distPath);

  // .ice/index.ts:
  // export * from './helpers';
  applyMethod('addExport', { source: './helpers', exportName: 'helpers' });
}
