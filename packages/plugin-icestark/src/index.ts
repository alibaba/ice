import * as path from 'path';
import * as glob from 'glob';
import * as fse from 'fs-extra';
import { IPlugin, Json } from '@alib/build-scripts';

const plugin: IPlugin = async ({ onGetWebpackConfig, getValue, applyMethod, context }, options = {}) => {
  const { rootDir, pkg } = context;
  const { umd, library } = options as Json;
  const iceTempPath = getValue('TEMP_PATH') || path.join(rootDir, '.ice');

  const hasDefaultLayout = glob.sync(`${path.join(rootDir, 'src/layouts/index')}.@(ts?(x)|js?(x))`).length;
  onGetWebpackConfig((config) => {
    // set alias for default layout
    config.resolve.alias.set('$ice/Layout', hasDefaultLayout ? path.join(rootDir, 'src/layouts') : path.join(__dirname, 'runtime/Layout'));
    // set alias for icestark
    ['@ice/stark', '@ice/stark-app'].forEach((pkgName) => {
      config.resolve.alias.set(pkgName, require.resolve(pkgName));
    });

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
                [require.resolve('./babelPluginMicroapp'), { entryList }],
                ...plugins,
              ],
            };
          });
      });
    }
  });

  await fse.copy(path.join(__dirname, '..', 'src/types/index.ts'), path.join(iceTempPath, 'types/icestark.ts'));
  applyMethod('addAppConfigTypes', { source: './types/icestark', specifier: '{ IIceStark }', exportName: 'icestark?: IIceStark' });
};

export default plugin;
