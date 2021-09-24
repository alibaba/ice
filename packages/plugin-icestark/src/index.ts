import * as path from 'path';
import * as glob from 'glob';
import * as fse from 'fs-extra';
import type { IPlugin, Json } from 'build-scripts';
import { icestarkPlugin } from './vitePluginIcetark';
import checkEntryFile from './checkEntryFile';
import { htmlPlugin } from './htmlPlugin';
import lifecyclePlugin from './lifecyclePlugin';
import type { Entries } from './vitePluginIcetark';

const plugin: IPlugin = async ({ onGetWebpackConfig, getValue, applyMethod, modifyUserConfig, context, log }, options = {}) => {
  const { uniqueName, umd, library, omitSetLibraryName = false, type = 'framework' } = options as Json;
  const { rootDir, webpack, pkg, userConfig } = context;
  const { vite } = userConfig;

  // Be compatible with child's unique properties.
  const _type = (umd !== undefined  || library !== undefined) ? 'child' : type;

  const iceTempPath = getValue<string>('TEMP_PATH') || path.join(rootDir, '.ice');
  const isWebpack5 = (webpack as any).version?.startsWith('5');

  const hasDefaultLayout = glob.sync(`${path.join(rootDir, 'src/layouts/index')}.@(ts?(x)|js?(x))`).length;

  if (vite && umd) {
    log.warn('[plugin-icestark]: umd do not work since vite is enabled. Just remove umd from build-plugin-icestark option.');
  }

  // copy runtime/Layout.tsx to .ice while it can not been analyzed with alias `$ice/Layout`
  const layoutSource = path.join(__dirname, '../src/runtime/Layout.tsx');
  const layoutPath = path.join(iceTempPath, 'plugins/icestark/pluginRuntime/runtime/Layout.tsx');
  applyMethod('addRenderFile', layoutSource, layoutPath);

  onGetWebpackConfig((config) => {
    const entries = config.toConfig().entry as Entries;

    // Only micro-applications need to be compiled to specific format.
    if (_type === 'child' && vite) {
      modifyUserConfig('vite.plugins', [icestarkPlugin(entries), htmlPlugin(rootDir), lifecyclePlugin(entries)], { deepmerge: true });
    }

    config
      .plugin('DefinePlugin')
      .tap(([args]) => [
        {
          ...args,
          'process.env.__FRAMEWORK_VERSION__': JSON.stringify(process.env.__FRAMEWORK_VERSION__),
          'process.env.__ICESTARK_TYPE__':  JSON.stringify(_type)
        }]);

    // set alias for default layout
    config.resolve.alias.set('$ice/Layout', hasDefaultLayout ? path.join(rootDir, 'src/layouts') : layoutPath);
    // set alias for icestark
    ['@ice/stark', '@ice/stark-app'].forEach((pkgName) => {
      config.resolve.alias.set(pkgName, require.resolve(pkgName));
    });

    // `uniqueName` is shared by framework and child
    // Remove output.jsonpFunction in webpack5 see: https://webpack.js.org/blog/2020-10-10-webpack-5-release/#automatic-unique-naming
    if (!isWebpack5 && uniqueName) {
      config.output.jsonpFunction(`webpackJsonp_${uniqueName}`);
    }

    // umd config
    if (_type === 'child' && umd) {
      const libraryName = library as string || pkg.name as string || 'microApp';
      config.output
        .library(libraryName)
        .libraryTarget('umd');

      // collect entry
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
                [require.resolve('./babelPluginMicroapp'), {
                  checkEntryFile: (filename: string) => checkEntryFile(entryList, filename),
                  libraryName,
                  omitSetLibraryName
                }],
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
