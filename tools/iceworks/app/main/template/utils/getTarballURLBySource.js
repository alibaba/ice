/**
 * 根据 srouce 描述获取 tarbar url
 * @param {*} npm
 * @param {*} version
 * @example
 * "source":
 * {
    "type": "npm",
    "npm": "@icedesign/foo-block",
    "version": "0.1.5",
    "version-0.x": "1.0.0",
    "sourceCodeDirectory": "src",
  },
  * "projectVersion": "1.x" // "0.x" 

 */
const npmRequest = require('../../utils/npmRequest');

module.exports = function getTarballURLBySource(source = {}, projectVersion) {
  return new Promise((resolve, reject) => {
    let version = source.version;
    // 注意！！！ 由于接口设计问题，version-0.x 字段实质指向1.x版本！
    if (projectVersion === '1.x')  {
      // 兼容没有'version-0.x'字段的情况
      version = source['version-0.x'] || source.version;
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
