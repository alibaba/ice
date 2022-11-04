import * as path from 'path';
import * as glob from 'glob';
import * as fse from 'fs-extra';
import type { IPlugin, Json } from 'build-scripts';
import htmlPlugin from 'vite-plugin-index-html';
import checkEntryFile from './checkEntryFile';
import lifecyclePlugin from './lifecyclePlugin';
import { getEntryFiles, getEntries } from './entryHelper';

const plugin: IPlugin = async ({ onGetWebpackConfig, getValue, applyMethod, modifyUserConfig, context, log }, options = {}) => {
  const { uniqueName, umd, library, omitSetLibraryName = false, type } = options as Json;
  const { rootDir, webpack, pkg, userConfig } = context;
  const { vite, mpa } = userConfig;
  const disableRouter = userConfig.router === false;
  let appType = type;

  if (!type) {
    log.warn(`
    [plugin-icestark]: type should to be included, which we truly suggested. see https://ice.work/docs/guide/advanced/icestark/#type-1
  `);
  }

  if (umd || library) {
    if (appType === 'framework') {
      log.warn(`
      [plugin-icestark]: Option umd and library should not be setted where type is 'framework'.
      see https://ice.work/docs/guide/advanced/icestark
    `);
    }

    if (!appType) {
      appType = 'child';

      log.warn(`
      [plugin-icestark]: supposed to be child type. and it is more preferable set type option with child.
      see https://ice.work/docs/guide/advanced/icestark
    `);
    }
  }

  if (!appType) {
    appType = 'framework';
  }

  const iceTempPath = getValue<string>('TEMP_PATH') || path.join(rootDir, '.ice');
  const isWebpack5 = (webpack as any).version?.startsWith('5');

  const hasDefaultLayout = glob.sync(`${path.join(rootDir, 'src/layouts/index')}.@(ts?(x)|js?(x))`).length;

  if (vite && umd) {
    // FIXME: support UMD format in vite mode
    log.warn('[plugin-icestark]: umd do not work since vite is enabled. Just remove umd from build-plugin-icestark options.');
  }

  // copy runtime/Layout.tsx to .ice while it can not been analyzed with alias `$ice/Layout`
  const layoutSource = path.join(__dirname, '../src/runtime/Layout.tsx');
  const layoutPath = path.join(iceTempPath, 'plugins/icestark/pluginRuntime/runtime/Layout.tsx');
  const fakeRouterSource = path.join(__dirname, '../src/runtime/_Router.tsx');
  const fakeRouterPath = path.join(iceTempPath, 'plugins/icestark/pluginRuntime/runtime/Router.tsx');
  applyMethod('addRenderFile', layoutSource, layoutPath);
  if (disableRouter) {
    applyMethod('addRenderFile', fakeRouterSource, fakeRouterPath);
  }

  onGetWebpackConfig((config) => {
    const entries = config.entryPoints.entries();

    // Only micro-applications need to be compiled to specific format.
    if (appType === 'child' && vite) {

      if (mpa || Object.keys(entries).length > 1) {
        log.warn('[plugin-icestark]: MPA is not supported currently.');
      } else {
        modifyUserConfig('vite.plugins', [
          htmlPlugin({
            // @ts-ignore
            entry: getEntries(entries),
            template: path.resolve(rootDir, 'public/index.html'),
            preserveEntrySignatures: 'exports-only'
          }),
          lifecyclePlugin(getEntryFiles(entries))
        ], { deepmerge: true });
      }
    }

    config
      .plugin('DefinePlugin')
      .tap(([args]) => [
        {
          ...args,
          'process.env.__FRAMEWORK_VERSION__': JSON.stringify(process.env.__FRAMEWORK_VERSION__),
          'process.env.__ICESTARK_TYPE__':  JSON.stringify(appType)
        }]);

    // set alias for default layout
    config.resolve.alias.set('$ice/Layout', hasDefaultLayout ? path.join(rootDir, 'src/layouts') : layoutPath);
    if (disableRouter) {
      // If router is false, overwrite alias config of $ice/Router.
      config.resolve.alias.set('$ice/Router', fakeRouterPath);
    }
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
    if (appType === 'child' && umd) {
      const libraryName = library as string || pkg.name as string || 'microApp';
      config.output
        .library(libraryName)
        .libraryTarget('umd');

      // collect entry
      const entryList = [];
      Object.keys(entries).forEach((key) => {
        const entryValues = entries[key].values();
        // only include entry path
        for (let i = 0; i < entryValues.length; i += 1) {
          // filter node_modules file add by plugin
          if (!/node_modules/.test(entryValues[i])) {
            entryList.push(entryValues[i]);
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

  const isVersion2 = Number(process.env.__FRAMEWORK_VERSION__[0]) > 1;

  if (isVersion2) {
    // copy type files to .ice/plugins/icestark
    applyMethod('addPluginTemplate', {
      template: path.join(__dirname, './types'),
      targetDir: 'icestark/types',
    });
    applyMethod('addAppConfigTypes', { source: '../plugins/icestark/types', specifier: '{ IIceStark }', exportName: 'icestark?: IIceStark' });
  } else {
    await fse.copy(path.join(__dirname, '..', 'src/types/index.ts'), path.join(iceTempPath, 'types/icestark.ts'));
    await fse.copy(path.join(__dirname, '..', 'src/types/base.ts'), path.join(iceTempPath, 'types/base.ts'));
    applyMethod('addAppConfigTypes', { source: './types/icestark', specifier: '{ IIceStark }', exportName: 'icestark?: IIceStark' });
  }
};

export default plugin;
