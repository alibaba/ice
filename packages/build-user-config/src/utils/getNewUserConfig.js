const mergeConfigKeys = ['devServer'];

module.exports = (userConfig, configKey, defaultValue) => {
  if (mergeConfigKeys.includes(configKey)) {
    return {...defaultValue, ...userConfig[configKey]};
  }
  return Object.prototype.hasOwnProperty.call(userConfig, configKey)
  ? userConfig[configKey]
  : defaultValue;
};
