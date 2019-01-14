/**
 * 根据 srouce 描述获取 tarbar url
 * @param {*} npm
 * @param {*} version
 * @example
 * "source":
 * {
    "type": "npm",
    "npm": "@icedesign/foo-block",
    "version": "1.0.0",
    "version-0.x": "0.1.5"
    "sourceCodeDirectory": "src",
  },
  * "projectVersion": "1.x" // "0.x" 

 */
const npmRequest = require('../../utils/npmRequest');

module.exports = function getTarballURLBySource(source = {}, projectVersion) {
  return new Promise((resolve, reject) => {
    let version = source.version;
    
    if (projectVersion === '0.x')  {
      version = source['version-0.x'];
    }

    npmRequest({
      name: source.npm,
      version: version,
      registry: source.registry,
    })
      .then((pkgData) => {
        resolve(pkgData.dist.tarball);
      })
      .catch(reject);
  });
};
