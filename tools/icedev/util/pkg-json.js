// @ts-check
const path = require('path');
// const {promisify} = require('util');
const fs = require('fs');

/**
 * @description 这样获取package.json 可以防止 require 缓存
 * @param{String} cwd 当前目录
 * @returns {Object} pkgJSON content
 */
function getPkgJSON(cwd) {
  const pkgJSONPath = path.join(cwd, './package.json');
  const pkgJSONString = fs.readFileSync(pkgJSONPath, 'utf-8');
  return JSON.parse(pkgJSONString);
}


function writePkgJSON(pkg, cwd) {
  const pkgJSONPath = path.join(cwd, './package.json');
  const pkgJSONString = JSON.stringify(pkg, null, 4);
  fs.writeFileSync(pkgJSONPath, pkgJSONString, 'utf-8');
}


module.exports = {
  getPkgJSON,
  writePkgJSON
};
