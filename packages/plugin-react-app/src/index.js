const path = require('path');
const { applyCliOption, applyUserConfig, getEnhancedWebpackConfig } = require('@builder/user-config');
const getWebpackConfig = require('@builder/webpack-config').default;
const { WEB, MINIAPP, WECHAT_MINIPROGRAM} = require('./constants');
const getCustomConfigs = require('./config');
const setBase = require('./setBase');
const setDev = require('./setDev');
const setBuild = require('./setBuild');
const setTest = require('./setTest');
const configWebpak5 = require('./webpack5');
const remoteRuntime = require('./userConfig/remoteRuntime').default;

module.exports = (api) => {
  const { onGetWebpackConfig, context, registerTask, getValue, modifyUserConfig } = api;
  const { command, rootDir, userConfig } = context;
  const { targets = [WEB] } = userConfig;
  const mode = command === 'start' ? 'development' : 'production';
  const isMiniapp = targets.includes(MINIAPP) || targets.includes(WECHAT_MINIPROGRAM);

  // register cli option
  applyCliOption(api);

  // register user config
  applyUserConfig(api, { customConfigs: getCustomConfigs(userConfig) });

  // modify default babel config when jsx runtime is enabled
  if (getValue('HAS_JSX_RUNTIME')) {
    modifyUserConfig('babelPresets', (userConfig.babalePresets || []).concat([['@babel/preset-react', { runtime: 'automatic'}]]));
  }

  // set webpack config
  onGetWebpackConfig(chainConfig => {
    // add resolve modules of project node_modules
    chainConfig.resolve.modules.add(path.join(rootDir, 'node_modules'));
  });

  targets.forEach(target => {
    const webpackConfig = getWebpackConfig(mode);

    // compatible with old logic，not set target
    // output：build/*
    if (target === WEB && !userConfig.targets) {
      target = '';
    }
    const enhancedWebpackConfig = getEnhancedWebpackConfig(api, { target, webpackConfig });
    enhancedWebpackConfig.name('web');
    setBase(api, { target, webpackConfig: enhancedWebpackConfig });
    registerTask(target, enhancedWebpackConfig);
  });

  if (command === 'start') {
    onGetWebpackConfig(config => {
      if (isMiniapp) {
        config.plugins.delete('HotModuleReplacementPlugin');
        config.devServer.set('writeToDisk', isMiniapp);
        config.devServer.hot(false).inline(false);
      }
    });
    setDev(api, { targets, isMiniapp });
  }

  if (command === 'build') {
    setBuild(api, { targets });
  }

  if (command === 'test') {
    setTest(api);
  }
  configWebpak5(api);

  if (userConfig.remoteRuntime) {
    remoteRuntime(api, userConfig.remoteRuntime);
  }
};
