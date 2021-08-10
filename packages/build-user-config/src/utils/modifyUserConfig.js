const { USER_CONFIG_KEY_WITHOUT_BUILD } = require('../config/constants');

const mergeConfigKeys = ['devServer'];

module.exports = (api, finallyConfigs) => {
  const { modifyUserConfig } = api;
  const defaultConfig = {};
  finallyConfigs.forEach(config => {
    if (Object.prototype.hasOwnProperty.call(config, 'defaultValue')) {
      defaultConfig[config.name] = config.defaultValue;
    }
  });
  // modify user config to keep execute order
  modifyUserConfig((userConfig) => {
    const executePriority = {
      // swc should be first
      swc: 2,
      // minify should execute before esbuild / terserOptions
      minify: 1,
    };
    // sort config key to make sure entry config is always execute before injectBabel, and filename before outputPath
    const configKeys = Object.keys(userConfig).sort((curr, next) => {
      if (executePriority[curr] && executePriority[next]) {
        return executePriority[next] - executePriority[curr];
      } else if (executePriority[curr] || executePriority[next]) {
        return executePriority[curr] ? -1 : 1;
      } else {
        return curr.localeCompare(next);
      }
    });
    const newConfig = {};
    configKeys.forEach((configKey) => {
      if (Object.prototype.hasOwnProperty.call(newConfig, configKey)) return;
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

    return newConfig;
  });
};
