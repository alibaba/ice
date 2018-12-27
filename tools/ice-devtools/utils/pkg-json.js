const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');
const message = require('../utils/message');

/**
 * @description 这样获取 package.json 可以防止 require 缓存
 * @param   {String} cwd 当前目录
 * @returns {Object} pkgJSON content
 */
function getPkgJSON(cwd) {
  const pkgJSONPath = path.join(cwd, './package.json');
  return getJSON(pkgJSONPath);
}

/**
 * @description 这样获取 package.json 可以防止 require 缓存
 * @param   {String} jsonPath 当前目录
 * @returns {Object} json content
 */
function getJSON(jsonPath) {
  if (!fs.existsSync(jsonPath)) {
    logger.fatal('getJSON:', message.invalid);
  }
  const jsonString = fs.readFileSync(jsonPath, 'utf-8');
  return JSON.parse(jsonString);
}

/**
 * 写package.json
 * @param {Object} pkg
 * @param {String} cwd
 */
function writePkgJSON(pkg, cwd) {
  const pkgJSONPath = path.join(cwd, './package.json');
  writeJSON(pkg, pkgJSONPath);
}

/**
 * 写json
 * @param {Object} obj jsonObject
 * @param {String} jsonPath jsonFilePath
 */
function writeJSON(obj, jsonPath) {
  if (!fs.existsSync(jsonPath)) {
    logger.fatal('writeJSON:', message.invalid);
  }
  const jsonString = JSON.stringify(obj, null, 4);
  fs.writeFileSync(jsonPath, jsonString, 'utf-8');
}

module.exports = {
  getPkgJSON,
  writePkgJSON,
  getJSON,
  writeJSON
};
