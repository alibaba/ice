import * as path from 'path';
import * as MiniAppRuntimePlugin from 'rax-miniapp-runtime-webpack-plugin';
import * as MiniAppConfigPlugin from 'rax-miniapp-config-webpack-plugin';
import * as getAppConfig from 'build-plugin-rax-app/lib/config/miniapp/getAppConfig';
import WrapChunkPlugin from './wrapchunkPlugin';

const EntryLoader = require.resolve('./MiniAppEntryLoader');

const TARGET = 'miniapp';

module.exports = (api) => {
  const { onGetWebpackConfig, context } = api;
  const { rootDir, command, userConfig } = context;
  const buildDir = path.join(rootDir, userConfig.outputDir, TARGET);

  // Using Components
  const usingComponents = {};

  // Native lifecycle map
  const nativeLifeCycleMap = {};

  // get app config
  const appConfig = getAppConfig(rootDir, TARGET, nativeLifeCycleMap);

  onGetWebpackConfig((config) => {

    if (command === 'start') {
      // write to dist for miniapp
      config.devServer.set('writeToDisk', true);
    }

    config.output
      .filename('common/[name].js')
      .library('createApp')
      .libraryExport('default')
      .libraryTarget('window');

    config.devtool('none');

    // @ts-ignore
    config.plugin('WrapChunkPlugin').use(new WrapChunkPlugin());

    // Clear entry
    config.entryPoints.clear();

    // Page entry
    const { routes } = appConfig;
    routes.forEach(({ entryName, source }) => {
      const entryConfig = config.entry(entryName);

      const pageEntry = getDepPath(rootDir, source);
      entryConfig.add(`${EntryLoader}?${JSON.stringify({ routes })}!${pageEntry}`);
    });

    // App entry
    config.entry('app').add(getDepPath(rootDir, 'app'));

    config.plugin('MiniAppConfigPlugin')
      .use(MiniAppConfigPlugin, [
        {
          type: 'runtime',
          appConfig,
          outputPath: buildDir,
          target: TARGET,
          getAppConfig,
          nativeConfig: {},
        }
      ]);

    config.plugin('MiniAppRuntimePlugin')
      .use(MiniAppRuntimePlugin, [
        {
          ...appConfig,
          target: TARGET,
          config: {},
          usingComponents,
          nativeLifeCycleMap,
          rootDir,
          command
        }
      ]);

    // remove default HtmlWebpackPlugin
    config.plugins.delete('HtmlWebpackPlugin');

    // remove default CopyWebpackPlugin
    config.plugins.delete('CopyWebpackPlugin');

    console.log(config.toConfig());
  });
};

function getDepPath(rootDir, com) {
  if (com[0] === path.sep ) {
    return path.join(rootDir, 'src', com);
  } else {
    return path.resolve(rootDir, 'src', com);
  }
};
