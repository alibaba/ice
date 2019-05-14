const processEntry = require('../config/processEntry');

module.exports = class PluginAPI {
  constructor(service) {
    this.service = service;
  }

  chainWebpack(fn) {
    this.service.chainWebpackFns.push(fn);
  }

  processEntry(entry) {
    const { commandArgs, command, userConfig } = this.service;
    return processEntry(entry, {
      polyfill: userConfig.injectBabel !== 'runtime',
      hotDev: command === 'dev' && !commandArgs.disabledReload,
    });
  }

  getWebpackConfig() {
    return this.service.getWebpackConfig();
  }
};
