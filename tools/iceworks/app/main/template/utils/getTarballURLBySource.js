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
    "sourceCodeDirectory": "src",
  },
 */
const npmRequest = require('../../utils/npmRequest');

module.exports = function getTarballURLBySource(source = {}) {
  return new Promise((resolve, reject) => {
    let version = source.version;

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
