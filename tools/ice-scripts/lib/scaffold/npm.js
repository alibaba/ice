const axios = require('axios');
const semver = require('semver');
const chalk = require('chalk');
const log = require('../utils/log');

const cacheData = {};

/**
 * 从 register 获取 npm 的信息
 */
function getNpmInfo(npm) {
  if (cacheData[npm]) {
    return cacheData[npm];
  }

  const register = getRegistry(npm);
  const url = `${register}/${npm}`;
  log.verbose('getNpmInfo', url);

  return axios.get(url).then((response) => {
    const body = response.data;

    if (body.error) {
      return Promise.reject(new Error(body.error));
    }

    cacheData[npm] = body;
    return body;
  });
}

/**
 * 获取某个 npm 的所有版本号
 */
function getVersions(npm) {
  return getNpmInfo(npm).then(function (body) {
    const versions = Object.keys(body.versions);
    return versions;
  });
}

/**
 * 根据指定 version 获取符合 semver 规范的最新版本号
 *
 * @param {String} baseVersion 指定的基准 version
 * @param {Array} versions
 */
function getLatestSemverVersion(baseVersion, versions) {
  versions = versions
    .filter((version) => semver.satisfies(version, `^${baseVersion}`))
    .sort((a, b) => {
      return semver.gt(b, a);
    });
  return versions[0];
}

/**
 * 根据指定 version 和包名获取符合 semver 规范的最新版本号
 *
 * @param {String} npm 包名
 * @param {String} baseVersion 指定的基准 version
 */
function getNpmLatestSemverVersion(npm, baseVersion) {
  return getVersions(npm).then(function (versions) {
    return getLatestSemverVersion(baseVersion, versions);
  });
}

/**
 * 获取某个 npm 的最新版本号
 *
 * @param {String} npm
 */
function getLatestVersion(npm) {
  return getNpmInfo(npm).then(function (data) {
    if (!data['dist-tags'] || !data['dist-tags'].latest) {
      log.error('没有 latest 版本号', data);
      return Promise.reject(new Error('没有 latest 版本号'));
    }

    const latestVersion = data['dist-tags'].latest;
    log.verbose('getLatestVersion result', npm, latestVersion);
    return latestVersion;
  });
}

function getRegistry(npmname) {
  if (/^(@alife|@ali|@alipay)/.test(npmname)) {
    return 'https://registry.npm.alibaba-inc.com';
  }

  // TODO: cnpm or npm
  return 'https://registry.npm.taobao.org';
}

module.exports = {
  getLatestVersion,
  getNpmLatestSemverVersion,
  getRegistry
};
