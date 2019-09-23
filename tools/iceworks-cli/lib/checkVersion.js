const semver = require('semver');
const { getNpmLatestSemverVersion } = require('ice-npm-utils');

module.exports = (packageName, packageVersion) => {
  // TODO: 建议写死官方源，否则会有不同步问题
  return getNpmLatestSemverVersion(packageName, packageVersion).then(latestVersion => {
    if (latestVersion && semver.lt(packageVersion, latestVersion)) {
      return Promise.resolve(latestVersion);
    }
  })
};
