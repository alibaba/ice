const optionConfig = require('./config/option.config');

module.exports = (api) => {
  const { registerCliOption, log } = api;
  const optionKeys = Object.keys(optionConfig);
  registerCliOption(optionKeys.map((optionKey) => {
    const { module, commands } = optionConfig[optionKey];
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
