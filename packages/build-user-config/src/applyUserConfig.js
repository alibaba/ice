const { unionBy } = require('@builder/app-helpers');
const modifyUserConfig = require('./utils/modifyUserConfig');
const baseUserConfigs = require('./config/user.config');

// TODO: move to build-plugin-react-app ?
const CONFIG = [{
  name: 'modeConfig',
  validation: 'object',
  defaultValue: {},
}, {
  name: 'disableRuntime',
  validation: 'boolean',
  defaultValue: false,
  configWebpack: () => {}
}];

module.exports = (api, options = {}) => {
  const { registerUserConfig } = api;
  const { customConfigs } = options;
  CONFIG.forEach((item) => registerUserConfig(item));

  const defaultConfig = baseUserConfigs.map((config) => {
    const { name } = config;
    let configFunc = null;
    try {
      // eslint-disable-next-line
      configFunc = require(`./userConfig/${name}`);
    // eslint-disable-next-line no-empty
    } catch (err) {}

    return {
      configWebpack: (chainConfig, configValue, context) => {
        if (configFunc) {
          // enhance api params
          configFunc(chainConfig, configValue, context, api);
        }
      },
      ...config,
    };
  });

  const finalyConfigs = unionBy(defaultConfig.concat(customConfigs), 'name');
  // register user config
  // sort config key to make sure entry config is always excute before injectBabel
  registerUserConfig(finalyConfigs);
  // modify user config to keep excute order
  modifyUserConfig(api, finalyConfigs);
};
