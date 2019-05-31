const request = require('request-promise');
const semver = require('semver');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const progress = require('request-progress');
const zlib = require('zlib');
const tar = require('tar');
const log = require('./log');

const cacheData = {};

/**
 * 获取指定 npm 包版本的 tarball
 */
function getNpmTarball(npm, version) {
  return getNpmInfo(npm).then((json) => {
    if (!semver.valid(version)) {
      version = json['dist-tags'].latest;
    }

    if (
      semver.valid(version) &&
      json.versions &&
      json.versions[version] &&
      json.versions[version].dist
    ) {
      return json.versions[version].dist.tarball;
    }

    return Promise.reject(new Error(`${name}@${version} 尚未发布`));
  });
}

/**
 * 获取 tar 并将其解压到指定的文件夹
 */
function getAndExtractTarball(destDir, tarball, progressFunc = () => {}) {
  return new Promise((resolve, reject) => {
    const allFiles = [];
    const allWriteStream = [];
    const dirCollector = [];

    progress(
      request({
        url: tarball,
        timeout: 10000,
      })
    )
      .on('progress', progressFunc)
      .on('error', reject)
      .pipe(zlib.Unzip())
      .pipe(new tar.Parse())
      .on('entry', (entry) => {
        const realPath = entry.path.replace(/^package\//, '');
        const destPath = path.join(destDir, realPath);

        const dirToBeCreate = path.dirname(destPath);
        if (!dirCollector.includes(dirToBeCreate)) {
          dirCollector.push(dirToBeCreate);
          mkdirp.sync(dirToBeCreate);
        }

        allFiles.push(destPath);
        allWriteStream.push(new Promise((streamResolve) => {
          entry
            .pipe(fs.createWriteStream(destPath))
            .on('finish', () => streamResolve());
        }));
      })
      .on('end', () => {
        if (progressFunc) {
          progressFunc({
            percent: 1,
          });
        }

        Promise.all(allWriteStream)
          .then(() => resolve(allFiles))
          .catch(reject);
      });
  });
}

/**
 * 从 register 获取 npm 的信息
 */
function getNpmInfo(npm) {
  if (cacheData[npm]) {
    return Promise.resolve(cacheData[npm]);
  }

  const register = getNpmRegistry(npm);
  const url = `${register}/${npm}`;
  log.verbose('getNpmInfo start', url);

  return request.get(url).then((response) => {
    log.verbose('getNpmInfo success', url);

    let body;
    try {
      body = JSON.parse(response);
    } catch (error) {
      return Promise.reject(error);
    }

    cacheData[npm] = body;
    return body;
  });
}

/**
 * 获取某个 npm 的所有版本号
 */
function getVersions(npm) {
  return getNpmInfo(npm).then((body) => {
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
  return getVersions(npm).then((versions) => {
    return getLatestSemverVersion(baseVersion, versions);
  });
}

/**
 * 获取某个 npm 的最新版本号
 *
 * @param {String} npm
 */
function getLatestVersion(npm) {
  return getNpmInfo(npm).then((data) => {
    if (!data['dist-tags'] || !data['dist-tags'].latest) {
      log.error('没有 latest 版本号', data);
      return Promise.reject(new Error('Error: 没有 latest 版本号'));
    }

    const latestVersion = data['dist-tags'].latest;
    log.verbose('getLatestVersion result', npm, latestVersion);
    return latestVersion;
  });
}

function isAliNpm(npmName) {
  return /^(@alife|@ali|@alipay)\//.test(npmName);
}

function getNpmRegistry(npmName = '') {
  if (process.env.REGISTRY) {
    return process.env.REGISTRY;
  }

  if (isAliNpm(npmName)) {
    return 'https://registry.npm.alibaba-inc.com';
  }

  // TODO: maybe default should be: registry.npm.com
  return 'https://registry.npm.taobao.org';
}

function getUnpkgHost(npmName = '') {
  if (process.env.UNPKG) {
    return process.env.UNPKG;
  }

  if (isAliNpm(npmName)) {
    return 'https://unpkg.alibaba-inc.com';
  }

  return 'https://unpkg.com';
}

function getNpmClient(npmName = '') {
  if (process.env.NPM_CLIENT) {
    return process.env.NPM_CLIENT;
  }

  if (isAliNpm(npmName)) {
    return 'tnpm';
  }

  return 'npm';
}

function checkAliInternal() {
  return request({
    url: 'https://ice.alibaba-inc.com/check.node',
    timeout: 3 * 1000,
  }).catch((err) => {
    log.verbose('checkAliInternal error: ', err);
    return false;
  }).then((response) => {
    return response.status === 200 && /success/.test(response.data);
  });
}

module.exports = {
  getLatestVersion,
  getNpmLatestSemverVersion,
  getNpmRegistry,
  getUnpkgHost,
  getNpmClient,
  isAliNpm,
  getNpmInfo,
  checkAliInternal,
  getNpmTarball,
  getAndExtractTarball,
};
