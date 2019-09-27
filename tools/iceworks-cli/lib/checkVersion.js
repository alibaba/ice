const semver = require('semver');
const { getNpmLatestSemverVersion } = require('ice-npm-utils');

module.exports = (packageName, packageVersion) => {
  // 默认使用 taobao 源，可能会有不同步问题
  return getNpmLatestSemverVersion(packageName, packageVersion).then(latestVersion => {
    if (latestVersion && semver.lt(packageVersion, latestVersion)) {
      return Promise.resolve(latestVersion);
    }
  });
};
