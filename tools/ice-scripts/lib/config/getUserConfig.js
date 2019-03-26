/**
 * 获取用户在项目中定义的 .webpackrc.js
 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const log = require('../utils/log');

// const jsonConfigFile = '.webpackrc';
const jsConfigFile = '.webpackrc.js';

module.exports = (opts = {}) => {
  const { cwd = process.cwd() } = opts;

  // const webpackRCPath = path.resolve(cwd, jsonConfigFile);
  const webpackRCJSPath = path.resolve(cwd, jsConfigFile);

  const userConfig = {};

  // todo support .webpackrc file
  if (fs.existsSync(webpackRCJSPath)) {
    log.info('注入 .webpackrc.js 的配置');
    // no cache
    delete require.cache[webpackRCJSPath];
    let config = require(webpackRCJSPath); // eslint-disable-line

    // support es module
    config = config.default || config;

    if (typeof config === 'function') {
      // 支持 .webpackrc.js 导出一个 function，用于向用户传递一些上下文环境

      // 提供给开发者的上下文
      const context = {
        webpack,
      };
      Object.assign(userConfig, config(context));
    } else {
      Object.assign(userConfig, config);
    }
  }

  if (userConfig.entry) {
    // eslint-disable-next-line no-console
    log.info('.webpackrc.js 存在 entry 配置');
  }

  return userConfig;
};
