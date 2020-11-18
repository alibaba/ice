const optionConfig = require('./config/option.config');

module.exports = (api, options = {}) => {
  const { registerCliOption, log } = api;
  const { customOptionConfig } = options;
  const config = {
    ...optionConfig,
    ...customOptionConfig,
  };

  const optionKeys = Object.keys(config);
  registerCliOption(optionKeys.map((optionKey) => {
    const { module, commands } = config[optionKey];
    const moduleName = module || optionKey;
    const optionDefination = {
      name: optionKey,
      commands,
    };
    if (module !== false) {
      try {
        // eslint-disable-next-line
        optionDefination.configWebpack = require(`./cliOption/${moduleName}`);
      } catch (err) {
        log.error(err);
      }
    }
    return optionDefination;
  }));
};
