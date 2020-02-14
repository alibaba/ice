import * as path from 'path'
import * as fse from 'fs-extra'
import { IPlugin } from '@alib/build-scripts'

const plugin: IPlugin = async (api): Promise<void> => {
  const { context, getValue, applyMethod, onGetWebpackConfig, registerCliOption } = api

  const srcPath = path.join(__dirname, '..', 'config')
  const distPath =  path.join(getValue('ICE_TEMP'), 'config')
  await fse.copy(srcPath, distPath)

  const exportName = 'config'

  // add to useApp exports
  applyMethod('addUseAppExport', { source: `./config`, exportName })

  // add to ice exports
  // applyMethod('addIceExport', { source: `./config`, exportName })

  registerCliOption({ name: 'mode', commands: ['start', 'build'] })

  onGetWebpackConfig((config) => {
    // add alias for module.ts use $ice/config
    config.resolve.alias.set('$ice/config', distPath);
    const { commandArgs, command } = context
    const appMode = commandArgs.mode || command;

    const defineVariables = { 'process.env.APP_MODE': JSON.stringify(appMode) }
    config
      .plugin('DefinePlugin')
      .tap((args) => [Object.assign({}, ...args, defineVariables)]);
  });
};

export default plugin
