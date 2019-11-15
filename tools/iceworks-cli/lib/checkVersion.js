const semver = require('semver');
const { getNpmLatestSemverVersion } = require('ice-npm-utils');

module.exports = (packageName, packageVersion) => {
  return getNpmLatestSemverVersion(packageName, packageVersion).then(latestVersion => {
    if (latestVersion && semver.lt(packageVersion, latestVersion)) {
      return Promise.resolve(latestVersion);
    }
  });
};
