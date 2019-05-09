const path = require('path');
const fse = require('fs-extra');
const assert = require('assert');
const Config = require('webpack-chain');
const webpackMerge = require('webpack-merge');
const log = require('../utils/log');
const getPkgData = require('../config/packageJson');
const paths = require('../config/paths');
const getDefaultWebpackConfig = require('../config/getDefaultWebpackConfig');
const PluginAPI = require('./Plugin');

module.exports = class Service {
  constructor({ command = '', context = process.cwd(), args = {} }) {
    this.command = command;
    this.commandArgs = args;
    this.context = context;
    this.pkg = getPkgData(this.context);
    this.paths = paths;
    // get user config form ice.config.js
    this.userConfig = this.getUserConfig(this.context);
    this.chainWebpackFns = [];
    this.plugins = this.getPlugins();
    this.defaultWebpackConfig = getDefaultWebpackConfig();
  }

  getUserConfig() {
    const iceConfigPath = path.resolve(this.context, 'ice.config.js');
    if (fse.existsSync(iceConfigPath)) {
      try {
        // eslint-disable-next-line import/no-dynamic-require
        return require(iceConfigPath);
      } catch (e) {
        log.error('Fail to load ice.config.js');
        throw e;
      }
    } else if (this.pkg.buildConfig) {
      log.warn('You should migrate config init ice.config.js');
    }
    return {};
  }

  getPlugins() {
    const builtInPlugins = [
      '../plugins/userConfig',
      '../plugins/cliOptions',
    ];
    // eslint-disable-next-line import/no-dynamic-require
    return builtInPlugins.map((pluginPath) => require(pluginPath))
      .concat(this.userConfig.plugins || []);
  }

  runPlugins() {
    // run plugins
    this.plugins.forEach((pluginInfo) => {
      if (!Array.isArray(pluginInfo)) {
        pluginInfo = [pluginInfo];
      }
      try {
        const [plugin, options] = pluginInfo;
        const pluginFunc = typeof plugin === 'string'
          // eslint-disable-next-line import/no-dynamic-require
          ? require(require.resolve(plugin, { paths: [this.context] }))
          : plugin;
        assert(typeof pluginFunc === 'function', 'plugin must export a function');
        pluginFunc(new PluginAPI(this), options);
      } catch (e) {
        const errorPlugin = pluginInfo[0];
        log.error(`Fail to load Plugin ${typeof errorPlugin === 'string' ? errorPlugin : ''}`);
        process.exit(1);
      }
    });
  }

  getWebpackConfig() {
    const config = new Config();
    this.chainWebpackFns.forEach((fn) => fn(config));
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
      // eslint-disable-next-line import/no-dynamic-require
      require(`../commands/${this.command}`)(this);
    } catch (e) {
      throw e;
    }
  }
};
