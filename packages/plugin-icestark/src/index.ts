import * as path from 'path';
import * as glob from 'glob';
import * as fse from 'fs-extra';
import { IPlugin } from '@alib/build-scripts';

const plugin: IPlugin = async ({ onGetWebpackConfig, getValue, applyMethod, context }) => {
  const { rootDir } = context;
  const iceTempPath = getValue('ICE_TEMP');

  const hasDefaultLayout = glob.sync(`${path.join(rootDir, 'src/layouts/index')}.@(ts?(x)|js?(x))`).length;
  onGetWebpackConfig((config) => {
    // set alias for default layout
    config.resolve.alias.set('$ice/Layout', hasDefaultLayout ? path.join(rootDir, 'src/layouts') : path.join(__dirname, 'runtime/Layout'));
    // set alias for icestark
    ['@ice/stark', '@ice/stark-app'].forEach((pkgName) => {
      config.resolve.alias.set(pkgName, require.resolve(pkgName));
    });
  });

  await fse.copy(path.join(__dirname, '..', 'src/types/index.ts'), path.join(iceTempPath, 'types/icestark.ts'));
  applyMethod('addIceAppConfigTypes', { source: './types/icestark', specifier: '{ IIceStark }', exportName: 'icestark?: IIceStark' });
};

export default plugin;
