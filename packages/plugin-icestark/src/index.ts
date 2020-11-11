import * as path from 'path';
import * as glob from 'glob';
import * as fse from 'fs-extra';
import { IPlugin, Json } from '@alib/build-scripts';

const plugin: IPlugin = async ({ onGetWebpackConfig, getValue, applyMethod, context }, options) => {
  const { uniqueName } = options as Json;
  const { rootDir, webpack } = context;
  const iceTempPath = getValue('TEMP_PATH');
  // remove output.jsonpFunction in webpack5 see: https://webpack.js.org/blog/2020-10-10-webpack-5-release/#automatic-unique-naming
  const isWebpack5 = (webpack as any).version?.startsWith('5');

  const hasDefaultLayout = glob.sync(`${path.join(rootDir, 'src/layouts/index')}.@(ts?(x)|js?(x))`).length;
  onGetWebpackConfig((config) => {
    // set alias for default layout
    config.resolve.alias.set('$ice/Layout', hasDefaultLayout ? path.join(rootDir, 'src/layouts') : path.join(__dirname, 'runtime/Layout'));
    // set alias for icestark
    ['@ice/stark', '@ice/stark-app'].forEach((pkgName) => {
      config.resolve.alias.set(pkgName, require.resolve(pkgName));
    });
    if (!isWebpack5 && uniqueName) {
      config.output.jsonpFunction(`webpackJsonp_${uniqueName}`);
    }
  });

  await fse.copy(path.join(__dirname, '..', 'src/types/index.ts'), path.join(iceTempPath, 'types/icestark.ts'));
  applyMethod('addAppConfigTypes', { source: './types/icestark', specifier: '{ IIceStark }', exportName: 'icestark?: IIceStark' });
};

export default plugin;
