const npmRequest = require('./npmRequest');

/**
 * Get the tarbal URL of the npm package from the registry
 * @param {*} npm
 * @param {*} version
 */
module.exports = function getTarball(npm, version = 'latest') {
  return new Promise((resolve, reject) => {
    npmRequest({ name: npm, version })
      .then((pkgData) => {
        resolve(pkgData.dist.tarball);
      })
      .catch(reject);
  });
};
