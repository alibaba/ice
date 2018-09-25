/**
 * 获取用户在项目中定义的 .webpackrc.js
 */
const path = require('path');
const fs = require('fs');
const colors = require('chalk');

// const jsonConfigFile = '.webpackrc';
const jsConfigFile = '.webpackrc.js';

module.exports = (opts = {}) => {
  const { cwd = process.cwd() } = opts;

  // const webpackRCPath = path.resolve(cwd, jsonConfigFile);
  const webpackRCJSPath = path.resolve(cwd, jsConfigFile);

  const userConfig = {};

  // todo support .webpackrc file
  if (fs.existsSync(webpackRCJSPath)) {
    // eslint-disable-next-line no-console
    console.log(colors.green('Info:'), '注入 .webpackrc.js 的配置');
    // no cache
    delete require.cache[webpackRCJSPath];
    const config = require(webpackRCJSPath); // eslint-disable-line
    // support es module
    if (config.default) {
      Object.assign(userConfig, config.default);
    } else {
      Object.assign(userConfig, config);
    }
  }

  if (userConfig.entry) {
    // eslint-disable-next-line no-console
    console.log(colors.green('Info:'), '.webpackrc.js 存在 entry 配置');
  }

  return userConfig;
};
