const processEntry = require('../config/processEntry');
const log = require('../utils/log');

module.exports = class PluginAPI {
  constructor(service, pluginName) {
    this.service = service;

    this.pluginName = pluginName;
    this.log = log;
    this.chainWebpack = this.chainWebpack.bind(this);
    this.processEntry = this.processEntry.bind(this);
    this.getWebpackConfig = this.getWebpackConfig.bind(this);
  }

  chainWebpack(fn) {
    this.service.chainWebpackFns.push({
      pluginName: this.pluginName,
      fn,
    });
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
