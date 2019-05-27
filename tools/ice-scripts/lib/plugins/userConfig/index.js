const log = require('../../utils/log');
const chalk = require('chalk');

module.exports = (api) => {
  const { userConfig = {} } = api.context;
  const configKeys = Object.keys(userConfig);
  configKeys.forEach((configKey) => {
    // filter plugins and chainWebpack config
    if (['plugins', 'chainWebpack'].indexOf(configKey) === -1) {
      try {
        // load config plugin
        // eslint-disable-next-line import/no-dynamic-require
        const configPlugin = require(`./configs/${configKey}`);
        configPlugin(api, userConfig[configKey]);
      } catch (e) {
        log.error(e);
        log.error(`Config ${chalk.bold(configKey)} is not defined`);
      }
    }
  });
};
