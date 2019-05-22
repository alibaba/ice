const path = require('path');
const fse = require('fs-extra');
const assert = require('assert');
const log = require('../utils/log');
const getPkgData = require('../config/getPackageJson');
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
    // get user config form ice.config.js
    this.userConfig = this.getUserConfig(this.context);
    this.plugins = this.getPlugins();
    // init chainWebpackFns and hooks
    this.chainWebpackFns = [];
    this.eventHooks = {};
  }

  getUserConfig() {
    const iceConfigPath = path.resolve(this.context, 'ice.config.js');
    let userConfig = {};
    if (fse.existsSync(iceConfigPath)) {
      try {
        // eslint-disable-next-line import/no-dynamic-require
        userConfig = require(iceConfigPath);
      } catch (err) {
        log.error('Fail to load ice.config.js, use default config instead');
        console.error(err);
        process.exit(1);
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
      const [plugin, options] = pluginInfo;
      const pluginName = typeof plugin === 'string' ? plugin : '';

      try {
        const pluginFunc = typeof plugin === 'string'
          // eslint-disable-next-line import/no-dynamic-require
          ? require(require.resolve(plugin, { paths: [this.context] }))
          : plugin;
        assert(typeof pluginFunc === 'function', 'plugin must export a function');
        // support async function
        // make sure to run async funtion in order
        // eslint-disable-next-line no-await-in-loop
        await pluginFunc(new PluginAPI(this, pluginName), options);
      } catch (err) {
        log.error(`Fail to load plugin ${pluginName}`);
        console.error(err);
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
      config.merge({ entry: processEntry(entry, {
        polyfill: this.userConfig.injectBabel !== 'runtime',
        hotDev: this.command === 'dev' && !this.commandArgs.disabledReload,
      }) });
    }
  }

  async applyHooks(key, opts = {}) {
    const hooks = this.eventHooks[key] || [];
    const results = [];
    hooks.forEach((fn) => {
      try {
        results.push(fn(opts));
      } catch (e) {
        log.error(e);
        log.error(`Fail to excute hook ${key}`);
      }
    });
    await Promise.all(results);
  }

  getWebpackConfig() {
    const config = getDefaultWebpackConfig(this.command);

    this.chainWebpackFns.forEach(({ fn, pluginName }) => {
      try {
        fn(config);
      } catch (err) {
        log.error(`Fail to exec plugin chainWebpack ${pluginName}`);
        console.error(err);
        process.exit(1);
      }
    });

    if (this.userConfig.chainWebpack) {
      try {
        this.userConfig.chainWebpack(config, {
          command: this.command,
          commandArgs: this.commandArgs,
        });
      } catch (err) {
        log.error('Fail to exec userConfig.chainWebpack');
        console.error(err);
        process.exit(1);
      }
    }
    // add polyfill/hotdev before origin entry
    this.processWepackEntry(config);
    return config.toConfig();
  }

  async reRun() {
    // reset chainWebpackFns and eventHooks before run command again
    this.chainWebpackFns = [];
    this.eventHooks = {};
    this.run();
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
