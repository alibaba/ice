const path = require('path');
const fs = require('fs');

const TYPES = ['react', 'vue'];

/**
 * 获取区块的类型(react、vue、angular、etc...)
 * @param   {String} workdir
 * @returns {String} type
 */
function getBlockType(workdir) {
  const projectPkg = path.join(workdir, '..', '../package.json');

  if (fs.existsSync(projectPkg)) {
    const jsonString = fs.readFileSync(projectPkg, 'utf-8');
    const pkgJSON = JSON.parse(jsonString);

    if (pkgJSON && pkgJSON.materialConfig) {
      return pkgJSON.materialConfig.type;
    }
  }

  // 兼容官方站点目录结构
  let result;
  TYPES.forEach((type) => {
    if (workdir.indexOf(type + '-materials') > -1) {
      result = type;
    }
  });

  return result;
}

module.exports = getBlockType;
