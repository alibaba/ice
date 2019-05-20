const log = require('../utils/log');

module.exports = class PluginAPI {
  constructor(service, pluginName) {
    this.service = service;

    this.pluginName = pluginName;
    this.log = log;
    this.chainWebpack = this.chainWebpack.bind(this);
    this.getWebpackConfig = this.getWebpackConfig.bind(this);
  }

  chainWebpack(fn) {
    this.service.chainWebpackFns.push({
      pluginName: this.pluginName,
      fn,
    });
  }

  getWebpackConfig() {
    return this.service.getWebpackConfig();
  }
};
