const processEntry = require('../config/processEntry');
const log = require('../utils/log');

module.exports = class PluginAPI {
  constructor(service) {
    this.service = service;

    this.log = log;
    this.chainWebpack = this.chainWebpack.bind(this);
    this.processEntry = this.processEntry.bind(this);
    this.getWebpackConfig = this.getWebpackConfig.bind(this);
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
