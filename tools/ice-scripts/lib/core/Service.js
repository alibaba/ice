const path = require('path');
const fse = require('fs-extra');
const Config = require('webpack-chain');
const webpackMerge = require('webpack-merge');
const log = require('../utils/log');
const getPkgData = require('../config/packageJson');
const paths = require('../config/paths');
const getDefaultWebpackConfig = require('../config/getDefaultWebpackConfig');
const PluginAPI = require('./Plugin');

module.exports = class Service {
  constructor({ command, context, args }) {
    this.command = command;
    this.commandArgs = args;
    this.context = context || process.cwd();
    this.pkg = getPkgData(this.context);
    this.paths = paths;
    // get user config form ice.config.js
    this.userConfig = this.getUserConfig(this.context);
    this.chainWebpackFns = [];
    this.defaultWebpackConfig = getDefaultWebpackConfig();
  }

  getUserConfig() {
    const iceConfigPath = path.resolve(this.context, 'ice.config.js');
    if (fse.existsSync(iceConfigPath)) {
      try {
        return require(iceConfigPath);
      } catch(e) {
        log.error('Fail to load ice.config.js');
        throw e;
      }
    } else if (this.pkg.buildConfig) {
      log.warn('You should migrate config init ice.config.js');
    }
    return {};
  }

  runPlugins() {
    this.plugins = this.userConfig.icePlugins || [];
    // TODO 使用内置插件来实现userConfig配置字段
    // run plugins
    this.plugins.forEach(plugin => {
      try {
        plugin.package(new PluginAPI(this), plugin.options);
      } catch (e) {
        // TODO get plugin name for debug
        log.error(`Error to load Plugin`);
        throw e;
      }
    });
  }

  getWebpackConfig() {
    const config = new Config();
    this.chainWebpackFns.forEach(fn => fn(config));
    if (this.userConfig.chainWebpack) {
      this.userConfig.chainWebpack(config);
    }
    // TODO this.commandArgs对wepackConfig的影响
    return webpackMerge(this.defaultWebpackConfig, config.toConfig());
  }

  run() {
    this.runPlugins();
    // get final config before run command
    this.config = this.getWebpackConfig();
    try {
      // load command and run
      require(`../${this.command}`)(this);
    } catch (e) {
      throw e;
    }
  }
}