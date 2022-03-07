const path = require('path');
const HtmlWebpackPlugin = require('@builder/pack/deps/html-webpack-plugin');
const { analyzeRuntime, analyzeAuth, globSourceFiles } = require('@builder/app-helpers');
const { getWebOutputPath, logWebpackConfig } = require('./utils');

module.exports = (api) => {
  const { context, onHook, onGetWebpackConfig, applyMethod, log } = api;
  const { userConfig, rootDir } = context;

  function disableRuntimePlugin(pluginName) {
    applyMethod('addDisableRuntimePlugin', pluginName);
    log.info('[analyze]' ,`${pluginName} removed after runtime analyse`);
  }

  if (userConfig.optimizeRuntime && !userConfig.mpa && !userConfig.disableRuntime) {
    // analyze source folder when SPA
    onHook('before.build.load', async () => {
      const sourceFiles = await globSourceFiles(path.join(rootDir, 'src'));
      const runtimeUsedMap = await analyzeRuntime(sourceFiles, { rootDir });
      Object.keys(runtimeUsedMap).forEach((pluginName) => {
        const isUsed = runtimeUsedMap[pluginName];
        if (!isUsed) {
          if (pluginName === 'build-plugin-ice-auth') {
            try {
              const appEntry = path.join(rootDir, 'src/app');
              const hasAuthConfig = analyzeAuth(appEntry);
              if (!hasAuthConfig) {
                disableRuntimePlugin(pluginName);
              }
            } catch (e) {
              console.log('[Error] errors occurred with analyze runApp');
            }  
          } else {
            disableRuntimePlugin(pluginName);
          }
        }
      });
    });
  }

  onHook('before.build.run', ({ config }) => {
    logWebpackConfig(config);
  });
  onGetWebpackConfig((config) => {
    const outputPath = getWebOutputPath(context);
    config.output.path(outputPath);
    // make a copy of html-webpack-plugin to generate 404.html
    if (config.plugins.get('HtmlWebpackPlugin')) {
      config
        .plugin('HtmlWebpackPlugin_404')
        .use(HtmlWebpackPlugin, [{
          ...config.plugin('HtmlWebpackPlugin').get('args')[0],
          filename: '404.html',
        }]);
    }
  });
};
