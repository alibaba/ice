module.exports = class PluginAPI {
  constructor(service) {
    this.service = service;
  }

  chainWebpackConfig(fn) {
    this.service.chainWebpackFns.push(fn);
  }

  getWebpackConfig() {
    return this.service.getWebpackConfig();
  }
}
