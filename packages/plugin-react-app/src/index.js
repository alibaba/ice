const path = require('path');
const { applyCliOption, applyUserConfig, getWebpackBase } = require('build-webpack-config');
const { WEB, MINIAPP, WECHAT_MINIPROGRAM} = require('./constants');
const setTest = require('./setTest');
const setDev = require('./setDev');
const setBuild = require('./setBuild');

module.exports = (api) => {
  const { onGetWebpackConfig, context, registerTask } = api;
  const { command, rootDir, userConfig } = context;
  const { targets = [WEB] } = userConfig;
  const isMiniapp = targets.includes(MINIAPP) || targets.includes(WECHAT_MINIPROGRAM);

  // register cli option
  applyCliOption(api);

  // register user config
  applyUserConfig(api);

  // set webpack config
  onGetWebpackConfig((chainConfig) => {
    // add resolve modules of project node_modules
    chainConfig.resolve.modules.add(path.join(rootDir, 'node_modules'));
  });

  targets.forEach(target => {
    // compatible with old logic，not set target
    // output：build/*
    if (target === WEB && !userConfig.targets) {
      target = '';
    }
    registerTask(target, getWebpackBase(api, { isMiniapp, target }));
  });

  if (command === 'start') {
    setDev(api, { targets, isMiniapp });
  }

  if (command === 'build') {
    setBuild(api, { targets });
  }

  if (command === 'test') {
    setTest(api);
  }
};


