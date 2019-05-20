const path = require('path');
const fse = require('fs-extra');
const assert = require('assert');
const log = require('../utils/log');
const getPkgData = require('../config/getPackageJson');
const paths = require('../config/paths');
const getDefaultWebpackConfig = require('../config/getDefaultWebpackConfig');
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

  getWebpackConfig() {
    const config = this.defaultWebpackConfig;

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
      this.userConfig.chainWebpack(config);
    }
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
