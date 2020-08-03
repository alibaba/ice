import * as path from 'path';
import * as MiniAppRuntimePlugin from 'rax-miniapp-runtime-webpack-plugin';
import * as MiniAppConfigPlugin from 'rax-miniapp-config-webpack-plugin';
import * as getAppConfig from 'build-plugin-rax-app/lib/config/miniapp/getAppConfig';

const EntryLoader = require.resolve('./MiniAppEntryLoader');

module.exports = (api) => {
  const { onGetWebpackConfig, context } = api;
  const { rootDir, command, userConfig } = context;
  const { targets = [] } = userConfig;

  // Using Components
  const usingComponents = {};

  // Using usingPlugins
  const usingPlugins = {};

  // Native lifecycle map
  const nativeLifeCycleMap = {};

  targets.forEach((target) => {
    onGetWebpackConfig(target, (config) => {

      const buildDir = path.join(rootDir, userConfig.outputDir, target);

      // Get app config
      const appConfig = getAppConfig(rootDir, target, nativeLifeCycleMap);

      if (command === 'start') {
        // Write to dist for miniapp
        config.devServer.set('writeToDisk', true);
      }

      config.output
        .filename(`${target}/common/[name].js`)
        .library('createApp')
        .libraryExport('default')
        .libraryTarget('window');

      config.devtool('none');

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
            target,
            appConfig,
            outputPath: buildDir,
            getAppConfig,
            nativeConfig: {},
          }
        ]);

      config.plugin('MiniAppRuntimePlugin')
        .use(MiniAppRuntimePlugin, [
          {
            ...appConfig,
            target,
            config: {},
            usingComponents,
            usingPlugins,
            nativeLifeCycleMap,
            rootDir,
            command
          }
        ]);

      if (config.plugins.get('MiniCssExtractPlugin')) {
        config.plugin('MiniCssExtractPlugin').tap((args) => [
          {
            ...args,
            filename: `${target}/[name].css`,
          }
        ]);
      }

      // Remove default HtmlWebpackPlugin
      config.plugins.delete('HtmlWebpackPlugin');

      // Remove default CopyWebpackPlugin
      config.plugins.delete('CopyWebpackPlugin');
    });
  });
};

function getDepPath(rootDir, com) {
  if (com[0] === path.sep ) {
    return path.join(rootDir, 'src', com);
  } else {
    return path.resolve(rootDir, 'src', com);
  }
};
