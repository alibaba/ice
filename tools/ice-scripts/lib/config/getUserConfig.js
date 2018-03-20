/**
 * 获取用户在项目中定义的 .webpackrc.js
 */
const path = require('path');
const fs = require('fs');
const assert = require('assert');

// const jsonConfigFile = '.webpackrc';
const jsConfigFile = '.webpackrc.js';

module.exports = (opts = {}) => {
  const { cwd = process.cwd() } = opts;

  // const webpackRCPath = path.resolve(cwd, jsonConfigFile);
  const webpackRCJSPath = path.resolve(cwd, jsConfigFile);

  const webpackConfig = {};

  // todo support .webpackrc file
  if (fs.existsSync(webpackRCJSPath)) {
    console.log('Inject .webpackrc.js to webpack.');
    // no cache
    delete require.cache[webpackRCJSPath];
    const config = require(webpackRCJSPath); // eslint-disable-line
    // support es module
    if (config.default) {
      Object.assign(webpackConfig, config.default);
    } else {
      Object.assign(webpackConfig, config);
    }
  }

  return webpackConfig;
};
