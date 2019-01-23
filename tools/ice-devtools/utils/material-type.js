const path = require('path');
const pkgJSON = require('./pkg-json');

/**
 * 获取物料仓库的类型(react、vue、angular、etc...)
 * @param   {String} workdir
 * @returns {String} type
 */
function getMaterialType(workdir) {
  const json = pkgJSON.getPkgJSON(workdir) || {};

  const blockConfig = json.blockConfig || {};

  return blockConfig.type || 'react';
}

module.exports = getMaterialType;
