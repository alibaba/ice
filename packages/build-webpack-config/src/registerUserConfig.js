const defaultConfig = require('./config/default.config');
const validation = require('./config/validation');

const CONFIG = [{
  name: 'modeConfig',
  validation: 'object',
  defaultValue: {},
}, {
  name: 'disableRuntime',
  validation: 'boolean',
  defaultValue: false
}];

module.exports = (api) => {
  const { registerUserConfig, log } = api;
  CONFIG.forEach((item) => registerUserConfig(item));

  // sort config key to make sure entry config is always excute before injectBabel
  const configKeys = Object.keys(defaultConfig).sort();
  // register user config
  registerUserConfig(configKeys.map((configKey) => {
    let configFunc = null;
    let configValidation = null;
    try {
      // eslint-disable-next-line
      configFunc = require(`./userConfig/${configKey}`);
      configValidation = validation[configKey];
    } catch (err) {
      log.error(err);
    }
    if (configFunc && configValidation) {
      return {
        name: configKey,
        validation: configValidation,
        configWebpack: configFunc,
        defaultValue: defaultConfig[configKey],
      };
    }
    return false;
  }).filter(Boolean));
};
