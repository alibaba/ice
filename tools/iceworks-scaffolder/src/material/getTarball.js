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
const npmRequestJson = require('npm-request-json');

module.exports = function getTarball(material = {}) {
  return new Promise((resolve, reject) => {
    const source = material.source;
    if (!source) {
      throw new Error('material must be specified `source` field');
    }
    let version = source.version;

    npmRequestJson({
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
