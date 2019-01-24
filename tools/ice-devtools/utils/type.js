const path = require('path');
const pkgJSON = require('./pkg-json');

/**
 * 获取物料仓库的类型(react、vue、angular、etc...)
 * @param   {String} workdir
 * @returns {String} type
 */
function getType(workdir) {
  const json = pkgJSON.getPkgJSON(workdir);
  if ('blockConfig' in json) {
    return 'block';
  }

  if ('scaffoldConfig' in json) {
    return 'scaffold';
  }

  if ('componentConfig' in json) {
    return 'component';
  }

  return null;
}

module.exports = getType;
