const defaultConfig = require('./config/default.config');

module.exports = (api) => {
  const { modifyUserConfig } = api;

  // modify user config to keep excute order
  modifyUserConfig((userConfig) => {
    const configKeys = [...Object.keys(userConfig), 'filename'].sort();
    const newConfig = {};
    configKeys.forEach((configKey) => {
      if (!['plugins', 'web', 'miniapp', 'weex', 'kraken', 'wechat-miniprogram', 'targets'].includes(configKey)) {
        newConfig[configKey] = Object.prototype.hasOwnProperty.call(userConfig, configKey)
          ? userConfig[configKey]
          : defaultConfig[configKey];
        delete userConfig[configKey];
      }
    });

    return newConfig;
  });
};
