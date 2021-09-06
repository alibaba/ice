import * as path from 'path';
import * as glob from 'glob';
import * as fse from 'fs-extra';
import type { IPlugin, Json } from 'build-scripts';
import { icestarkPlugin } from './vitePluginIcetark';

const plugin: IPlugin = async ({ onGetWebpackConfig, getValue, applyMethod, modifyUserConfig, context }, options = {}) => {
  const { uniqueName, umd, library, omitSetLibraryName = false, command } = options as Json;
  const { rootDir, webpack, pkg, userConfig } = context;
  const { vite } = userConfig as any;

  const isProd = command === 'build';

  if (isProd && userConfig.vite) {
    modifyUserConfig('vite.plugins', [icestarkPlugin(context)], { deepmerge: true });
  }

  const iceTempPath = getValue<string>('TEMP_PATH') || path.join(rootDir, '.ice');
  // remove output.jsonpFunction in webpack5 see: https://webpack.js.org/blog/2020-10-10-webpack-5-release/#automatic-unique-naming
  const isWebpack5 = (webpack as any).version?.startsWith('5');

  const hasDefaultLayout = glob.sync(`${path.join(rootDir, 'src/layouts/index')}.@(ts?(x)|js?(x))`).length;
  onGetWebpackConfig((config) => {
    config
      .plugin('DefinePlugin')
      .tap(([args]) => [{ ...args, 'process.env.__FRAMEWORK_VERSION__': JSON.stringify(process.env.__FRAMEWORK_VERSION__) }]);
    // set alias for default layout
    const layoutPath = vite ? path.join(__dirname, '../src/runtime/Layout.tsx') : path.join(__dirname, 'runtime/Layout');
    config.resolve.alias.set('$ice/Layout', hasDefaultLayout ? path.join(rootDir, 'src/layouts') : layoutPath);
    // set alias for icestark
    ['@ice/stark', '@ice/stark-app'].forEach((pkgName) => {
      config.resolve.alias.set(pkgName, require.resolve(pkgName));
    });

    if (!isWebpack5 && uniqueName) {
      config.output.jsonpFunction(`webpackJsonp_${uniqueName}`);
    }
    // umd config
    if (umd) {
      const libraryName = library as string || pkg.name as string || 'microApp';
      config.output
        .library(libraryName)
        .libraryTarget('umd');

      // collect entry
      const entries = config.toConfig().entry;
      const entryList = [];
      Object.keys(entries).forEach((key) => {
        // only include entry path
        for (let i = 0; i < entries[key].length; i += 1) {
          // filter node_modules file add by plugin
          if (!/node_modules/.test(entries[key][i])) {
            entryList.push(entries[key][i]);
          }
        }
      });
      // add build-plugin-microapp
      ['jsx', 'tsx'].forEach((rule) => {
        config.module
          .rule(rule)
          .use('babel-loader')
          .tap((babelOptions) => {
            const { plugins = [] } = babelOptions;
            return {
              ...babelOptions,
              plugins: [
                [require.resolve('./babelPluginMicroapp'), { entryList, libraryName, omitSetLibraryName }],
                ...plugins,
              ],
            };
          });
      });
    }
  });

  await fse.copy(path.join(__dirname, '..', 'src/types/index.ts'), path.join(iceTempPath, 'types/icestark.ts'));
  await fse.copy(path.join(__dirname, '..', 'src/types/base.ts'), path.join(iceTempPath, 'types/base.ts'));
  applyMethod('addAppConfigTypes', { source: './types/icestark', specifier: '{ IIceStark }', exportName: 'icestark?: IIceStark' });
};

export default plugin;
