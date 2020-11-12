const { USER_CONFIG_KEY_WITHOUT_BUILD } = require('../config/constants');

module.exports = (api, defaultRegistration) => {
  const { modifyUserConfig } = api;
  const defaultConfig = {};
  defaultRegistration.forEach(({name, defaultValue}) => {
    defaultConfig[name] = defaultValue;
  });
  // modify user config to keep excute order
  modifyUserConfig((userConfig) => {
    const configKeys = [...Object.keys(userConfig), 'filename'].sort();
    const newConfig = {};
    configKeys.forEach((configKey) => {
      if (!USER_CONFIG_KEY_WITHOUT_BUILD.includes(configKey)) {
        newConfig[configKey] = Object.prototype.hasOwnProperty.call(userConfig, configKey)
          ? userConfig[configKey]
          : defaultConfig[configKey];
        // eslint-disable-next-line no-param-reassign
        delete userConfig[configKey];
      }
    });
    // migrate sourcemap to sourceMap
    if (Object.prototype.hasOwnProperty.call(newConfig, 'sourcemap') && !newConfig.sourceMap) {
      newConfig.sourceMap = newConfig.sourcemap;
    }
    delete newConfig.sourcemap;
    return newConfig;
  });
};
