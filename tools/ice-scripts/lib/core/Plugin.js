const log = require('../utils/log');

module.exports = class PluginAPI {
  constructor(context, pluginName) {
    this.context = context;

    this.pluginName = pluginName;
    this.log = log;
    this.chainWebpack = this.chainWebpack.bind(this);
    this.getWebpackConfig = this.getWebpackConfig.bind(this);
    this.onHook = this.onHook.bind(this);
  }

  chainWebpack(fn) {
    this.context.chainWebpackFns.push({
      pluginName: this.pluginName,
      fn,
    });
  }

  onHook(key, fn) {
    if (!Array.isArray(this.context.eventHooks[key])) {
      this.context.eventHooks[key] = [];
    }
    this.context.eventHooks[key].push(fn);
  }

  getWebpackConfig() {
    return this.context.getWebpackConfig();
  }
};
