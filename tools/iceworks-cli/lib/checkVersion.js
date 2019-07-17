const semver = require('semver');
const { getNpmLatestSemverVersion } = require('ice-npm-utils');

module.exports = async (packageName, packageVersion) => {
  try {
    const latestVersion = await getNpmLatestSemverVersion(packageName, packageVersion);
    if (semver.lt(packageVersion, latestVersion)) {
      return latestVersion;
    }
  } catch (error) {
    // ...
  }
};
