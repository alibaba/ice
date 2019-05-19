const path = require('path');
const fse = require('fs-extra');
const assert = require('assert');
const log = require('../utils/log');
const getPkgData = require('../config/getPackageJson');
const paths = require('../config/paths');
const getDefaultWebpackConfig = require('../config/getDefaultWebpackConfig');
const processEntry = require('../config/processEntry');
const PluginAPI = require('./Plugin');
const defaultConfig = require('../config/default.config');
const deepmerge = require('deepmerge');

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
    this.defaultWebpackConfig = getDefaultWebpackConfig(command);
  }

  getUserConfig() {
    const iceConfigPath = path.resolve(this.context, 'ice.config.js');
    let userConfig = {};
    if (fse.existsSync(iceConfigPath)) {
      try {
        // eslint-disable-next-line import/no-dynamic-require
        userConfig = require(iceConfigPath);
      } catch (e) {
        log.error('Fail to load ice.config.js, use default config instead');
      }
    } else if (this.pkg.buildConfig) {
      log.warn('You should migrate config into ice.config.js');
    }
    return deepmerge(defaultConfig, userConfig);
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

  async runPlugins() {
    // run plugins
    for (let i = 0; i < this.plugins.length; i++) {
      let pluginInfo = this.plugins[i];
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
        // support async function
        // make sure to run async funtion in order
        // eslint-disable-next-line no-await-in-loop
        await pluginFunc(new PluginAPI(this), options);
      } catch (e) {
        const errorPlugin = pluginInfo[0];
        log.error(e);
        log.error(`Fail to load Plugin ${typeof errorPlugin === 'string' ? errorPlugin : ''}`);
        process.exit(1);
      }
    }
  }

  // process entry
  processWepackEntry(config) {
    const entry = config.toConfig().entry;
    if (entry) {
      // delete origin entry
      config.entryPoints.clear();
      // merge new entry
      console.log('add hot dev', this.command === 'dev', !this.commandArgs.disabledReload)
      config.merge({ entry: processEntry(entry, {
        polyfill: this.userConfig.injectBabel !== 'runtime',
        hotDev: this.command === 'dev' && !this.commandArgs.disabledReload,
      }) });
    }
  }

  getWebpackConfig() {
    const config = this.defaultWebpackConfig;

    this.chainWebpackFns.forEach((fn) => fn(config));
    if (this.userConfig.chainWebpack) {
      this.userConfig.chainWebpack(config);
    }
    // add polyfill/hotdev before origin entry
    this.processWepackEntry(config);
    return config.toConfig();
  }

  async run() {
    await this.runPlugins();
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
