const { USER_CONFIG_KEY_WITHOUT_BUILD } = require('../config/constants');

const mergeConfigKeys = ['devServer'];

module.exports = (api, finalyConfigs) => {
  const { modifyUserConfig, context } = api;
  const defaultConfig = {};
  finalyConfigs.forEach(config => {
    if (Object.prototype.hasOwnProperty.call(config, 'defaultValue')) {
      defaultConfig[config.name] = config.defaultValue;
    }
  });
  // modify user config to keep excute order
  modifyUserConfig((userConfig) => {
    // sort config key to make sure entry config is always excute before injectBabel, and filename before outputPath
    const configKeys = Object.keys(userConfig).sort((curr, next) => curr.localeCompare(next));
    const newConfig = {};
    configKeys.forEach((configKey) => {
      if (!USER_CONFIG_KEY_WITHOUT_BUILD.includes(configKey)) {
        if (mergeConfigKeys.includes(configKey)) {
          newConfig[configKey] = {...defaultConfig[configKey], ...userConfig[configKey]};
        } else {
          newConfig[configKey] = userConfig[configKey];
        }
        // eslint-disable-next-line no-param-reassign
        delete userConfig[configKey];
      }
    });
    // migrate sourcemap to sourceMap
    if (Object.prototype.hasOwnProperty.call(newConfig, 'sourcemap') && !newConfig.sourceMap) {
      newConfig.sourceMap = newConfig.sourcemap;
    }
    delete newConfig.sourcemap;
    context.userConfig = newConfig;
    return newConfig;
  });
};
