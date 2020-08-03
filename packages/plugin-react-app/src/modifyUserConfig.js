const defaultConfig = require('./config/default.config');

module.exports = (api) => {
  const { modifyUserConfig, context } = api;
  const { commandArgs, command } = context;
  const appMode = commandArgs.mode || command;

  modifyUserConfig((userConfig) => {
    const { modeConfig = {} } = userConfig;
    return modeConfig[appMode] || {};
  });

  // modify user config to keep excute order
  modifyUserConfig((userConfig) => {
    const configKeys = [...Object.keys(userConfig), 'filename'].sort();
    const newConfig = {};
    configKeys.forEach((configKey) => {
      if (configKey !== 'plugins') {
        newConfig[configKey] = Object.prototype.hasOwnProperty.call(userConfig, configKey)
          ? userConfig[configKey]
          : defaultConfig[configKey];;
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
