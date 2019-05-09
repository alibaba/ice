const processEntry = require('../../../config/processEntry');

module.exports = (api, value) => {
  const { command, commandArgs, userConfig } = api.service;
  const entry = processEntry(value,
    {
      polyfill: userConfig.injectBabel !== 'runtime',
      hotDev: command === 'dev' && !commandArgs.disabledReload,
    }
  );
  api.chainWebpack((config) => {
    // remove default entry then add new enrty to webpack config
    config.delete('entry').merge({ entry });
  });
};
