module.exports = class PluginAPI {
  constructor(service) {
    this.service = service;
  }

  chainWebpack(fn) {
    this.service.chainWebpackFns.push(fn);
  }

  getWebpackConfig() {
    return this.service.getWebpackConfig();
  }
};
