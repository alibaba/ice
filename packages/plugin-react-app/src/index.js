const path = require('path');
const { applyCliOption, applyUserConfig, getEnhancedWebpackConfig } = require('@builder/user-config');
const { getWebpackConfig, getBabelConfig } = require('build-scripts-config');
const { WEB, MINIAPP, WECHAT_MINIPROGRAM} = require('./constants');
const customConfigs = require('./config');
const setBase = require('./setBase');
const setDev = require('./setDev');
const setBuild = require('./setBuild');
const setTest = require('./setTest');

module.exports = (api) => {
  const { onGetWebpackConfig, context, registerTask } = api;
  const { command, rootDir, userConfig } = context;
  const { targets = [WEB] } = userConfig;
  const mode = command === 'start' ? 'development' : 'production';
  const webpackConfig = getWebpackConfig(mode);
  const babelConfig = getBabelConfig();
  const isMiniapp = targets.includes(MINIAPP) || targets.includes(WECHAT_MINIPROGRAM);

  // register cli option
  applyCliOption(api);

  // register user config
  applyUserConfig(api, { customConfigs });

  // set webpack config
  onGetWebpackConfig(chainConfig => {
    // add resolve modules of project node_modules
    chainConfig.resolve.modules.add(path.join(rootDir, 'node_modules'));
  });

  targets.forEach(target => {
    // compatible with old logic，not set target
    // output：build/*
    if (target === WEB && !userConfig.targets) {
      target = '';
    }
    registerTask(target, getEnhancedWebpackConfig(api, { target, webpackConfig, babelConfig }));

    onGetWebpackConfig((chainConfig) => {
      setBase(api, { target, webpackConfig: chainConfig  });
    });
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
};
