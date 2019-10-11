const fse = require('fs-extra');
const { CONFIG_PATH, TOKEN_ALI_KEY, TOKEN_KEY } = require('./constants');
const log = require('../lib/log');

let config;

function validateConfigKey(key) {
  const keys = [
    TOKEN_ALI_KEY,
    TOKEN_KEY,
    'registry',
    'unpkgHost',
  ];

  if (keys.indexOf(key) === -1) {
    throw new Error(`Invalid config key ${key}, support keys ${keys.join()}`);
  }
}

module.exports = {

  async get(key) {
    if (key) {
      validateConfigKey(key);
    }

    await this.setupConfig();

    const value = key ? config[key] : config;
    log.verbose('config.get success', key, value);

    return value;
  },

  async set(key, value) {
    validateConfigKey(key);

    await this.setupConfig();

    config[key] = value;
    await fse.writeJSON(CONFIG_PATH, config);
    log.verbose('config.set success', key, value);
  },

  // private
  async setupConfig() {
    if (!config) {
      if (!fse.existsSync(CONFIG_PATH)) {
        await fse.ensureFile(CONFIG_PATH);
        await fse.writeJson(CONFIG_PATH, {});
      }
      config = await fse.readJson(CONFIG_PATH);
      config = config || {};
    }
  },
};
