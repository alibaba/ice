const path = require('path');
const optionConfig = require('./config/option.config');

module.exports = (api, options = {}) => {
  const { registerCliOption, log } = api;
  const { customOptionConfig } = options;
  const mergedOptionConfig = {
    ...optionConfig,
    ...customOptionConfig,
  };

  const optionKeys = Object.keys(mergedOptionConfig);
  registerCliOption(optionKeys.map((optionKey) => {
    const { module, commands } = mergedOptionConfig[optionKey];
    const moduleName = module || optionKey;
    const optionDefination = {
      name: optionKey,
      commands,
    };
    if (module !== false) {
      try {
        // eslint-disable-next-line
        optionDefination.configWebpack = require(path.isAbsolute(moduleName) ? moduleName : `./cliOption/${moduleName}`);
      } catch (err) {
        log.error(err);
      }
    }
    return optionDefination;
  }));
};
