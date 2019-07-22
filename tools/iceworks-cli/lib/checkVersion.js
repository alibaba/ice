const semver = require('semver');
const { getNpmLatestSemverVersion } = require('ice-npm-utils');

module.exports = (packageName, packageVersion) => {
  try {
    return getNpmLatestSemverVersion(packageName, packageVersion).then(latestVersion => {
      if (semver.lt(packageVersion, latestVersion)) {
        return latestVersion;
      }
    })
  } catch (error) {
    // ...
  }
};
