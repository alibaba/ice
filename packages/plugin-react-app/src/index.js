const path = require('path');
const { applyCliOption, applyUserConfig, getEnhancedWebpackConfig } = require('@builder/user-config');
const getWebpackConfig = require('@builder/webpack-config').default;
const { WEB, MINIAPP, WECHAT_MINIPROGRAM} = require('./constants');
const getCustomConfigs = require('./config');
const setBase = require('./setBase');
const setDev = require('./setDev');
const setBuild = require('./setBuild');
const setTest = require('./setTest');
const remoteRuntime = require('./userConfig/remoteRuntime').default;

module.exports = async (api) => {
  const { onGetWebpackConfig, context, registerTask, getValue, modifyUserConfig } = api;
  const { command, rootDir, userConfig, originalUserConfig } = context;
  const { targets = [WEB] } = userConfig;
  const mode = command === 'start' ? 'development' : 'production';
  const isMiniapp = targets.includes(MINIAPP) || targets.includes(WECHAT_MINIPROGRAM);

  // register cli option
  applyCliOption(api);

  // register user config
  applyUserConfig(api, { customConfigs: getCustomConfigs(userConfig) });

  // modify default babel config when jsx runtime is enabled
  if (getValue('HAS_JSX_RUNTIME')) {
    modifyUserConfig('babelPresets', (userConfig.babelPresets || []).concat([['@babel/preset-react', { runtime: 'automatic'}]]));

    if (userConfig.vite) {
      modifyUserConfig('vite.esbuild', { jsxInject: 'import React from \'react\''}, { deepmerge: true });
    }
  }

  // modify minify options
  if (userConfig.swc && !Object.prototype.hasOwnProperty.call(originalUserConfig, 'minify')) {
    modifyUserConfig('minify', 'swc');
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
    setDev(api, { targets, isMiniapp });
  }

  if (command === 'build') {
    setBuild(api, { targets });
  }

  if (command === 'test') {
    setTest(api);
  }

  if (userConfig.remoteRuntime) {
    await remoteRuntime(api, userConfig.remoteRuntime);
  }
};
