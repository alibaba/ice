const log = require('../../utils/log');
const chalk = require('chalk');

module.exports = (api) => {
  const { userConfig = {} } = api.service;
  const configKeys = Object.keys(userConfig);
  configKeys.forEach((configKey) => {
    if (['plugins', 'chainWebpack'].indexOf(configKey) > -1) {
      try {
        // load config plugin
        // eslint-disable-next-line import/no-dynamic-require
        const configPlugin = require(`./configs/${configKey}`);
        configPlugin(api, userConfig[configKey]);
      } catch (e) {
        log.error(`Config ${chalk.bold(configKey)} is not defined`);
      }
    }
  });
};
