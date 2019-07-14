/* eslint prefer-template:0 */
const semver = require('semver');
const request = require('request-promise-native');

module.exports = async (packageName, packageVersion) => {
  try {
    const body = await request({
      url: `https://registry.cnpmjs.org/${packageName}`,
      timeout: 3000,
    });
    const latestVersion = JSON.parse(body)['dist-tags'].latest;
    if (semver.lt(packageVersion, latestVersion)) {
      return latestVersion;
    }
  } catch (error) {
    // ...
  }
};
