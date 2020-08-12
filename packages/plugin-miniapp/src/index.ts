import * as path from 'path';
import * as MiniAppRuntimePlugin from 'rax-miniapp-runtime-webpack-plugin';
import * as MiniAppConfigPlugin from 'rax-miniapp-config-webpack-plugin';
import * as getAppConfig from 'build-plugin-rax-app/src/config/miniapp/getAppConfig';

module.exports = (api) => {
  const { onGetWebpackConfig, context, getValue } = api;
  const { rootDir, command, userConfig } = context;
  const { targets = [] } = userConfig;

  // Using Components
  const usingComponents = {};

  // Using usingPlugins
  const usingPlugins = {};

  // Native lifecycle map
  const nativeLifeCycleMap = {};

  // Need Copy files or dir
  const needCopyList = [];

  targets.forEach((target) => {
    if (target === 'miniapp' || target === 'wechat-miniprogram') {
      onGetWebpackConfig(target, (config) => {

        const buildDir = path.join(rootDir, userConfig.outputDir, target);

        const projectType = getValue('PROJECT_TYPE');

        // Get app config
        const appConfig = getAppConfig(rootDir, target, nativeLifeCycleMap);

        config.output
          .filename(`${target}/common/[name].js`);

        config.devtool('none');

        // Clear entry
        config.entryPoints.clear();

        // App entry
        config.entry('index').add(getDepPath(rootDir, `app.${projectType}`));

        config.plugin('MiniAppConfigPlugin')
          .use(MiniAppConfigPlugin, [
            {
              type: 'runtime',
              appConfig,
              outputPath: buildDir,
              target,
              getAppConfig,
              nativeConfig: userConfig[target] && userConfig[target].nativeConfig,
            }
          ]);

        config.plugin('MiniAppRuntimePlugin')
          .use(MiniAppRuntimePlugin, [
            {
              ...appConfig,
              target,
              config: userConfig[target] || {},
              usingComponents,
              usingPlugins,
              nativeLifeCycleMap,
              rootDir,
              command,
              needCopyList
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
    };
  });
};

function getDepPath(rootDir, com) {
  if (com[0] === path.sep ) {
    return path.join(rootDir, 'src', com);
  } else {
    return path.resolve(rootDir, 'src', com);
  }
};
