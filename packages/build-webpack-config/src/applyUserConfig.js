const defaultConfig = require('./config/default.config');
const validation = require('./config/validation');
const modifyUserConfig = require('./utils/modifyUserConfig');

// TODO: move to build-plugin-react-app ?
const CONFIG = [{
  name: 'modeConfig',
  validation: 'object',
  defaultValue: {},
}, {
  name: 'disableRuntime',
  validation: 'boolean',
  defaultValue: false
}];

module.exports = (api, { customConfig }) => {
  const { registerUserConfig, log } = api;
  CONFIG.forEach((item) => registerUserConfig(item));

  const config = Object.assign({}, defaultConfig, customConfig);

  // sort config key to make sure entry config is always excute before injectBabel
  const configKeys = Object.keys(config).sort();

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
        defaultValue: config[configKey],
      };
    }
    return false;
  }).filter(Boolean));

  // modify user config to keep excute order
  modifyUserConfig(api);
};
