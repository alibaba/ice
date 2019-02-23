const request = require('request');
const debug = require('debug')('ice:util:npm');
const semver = require('semver');
const chalk = require('chalk');
const innerNet = require('../utils/inner-net');

const cacheData = {};
/**
   * 从 register 获取 npm 的信息
   */
function getNpmInfo(npm) {
  if (cacheData[npm]) {
    return Promise.resolve(cacheData[npm]);
  }

  const register = innerNet.getRegistry(npm);
  const url = `${register}/${npm}`;
  debug('npm url: %s', url);
  return new Promise(function (resolve, reject) {
    request(
      {
        url,
        json: true,
      },
      function (err, res, body) {
        if (err || body.error) {
          return reject(err || new Error(body.error));
        } else {
          cacheData[npm] = body;
          return resolve(body);
        }
      }
    );
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
      console.error(chalk.red('没有 latest 版本号', data));
      return Promise.reject(new Error('没有 latest 版本号'));
    }

    const latestVersion = data['dist-tags'].latest;
    debug('latestVerion', npm, latestVersion);
    return latestVersion;
  });
}
/**
 * 检测 NPM 包是否已发送，并返回包的发布时间
 * @param  {string} npm      package name
 * @param  {String} version  pacage version
 * @param  {String} registry npm registry
 * @return {array}
 *         [code, resute]
 */
function getNpmTime(npm, version = 'latest') {
  return getNpmInfo(npm)
    .then(function (data) {
      if (!data.time) {
        console.error(chalk.red('time 字段不存在'));
        return Promise.reject(new Error('time 字段不存在'));
      }
      // 传进来的可能是 latest 这种非 数字型的 版本号
      const distTags = data['dist-tags'];
      version = distTags[version] || version;
      const { versions } = data;
      if (!versions || versions[version] === undefined) {
        throw new Error(`${npm}@${version} 未发布! 禁止提交!`);
      }
      return [0, data.time];
    })
    .catch((err) => {
      if (
        (err.response && err.response.status === 404) 
        || err.message === 'Not found' // tnpm
        || err.message === 'not_found' // npm
      ) {
        // 这种情况是该 npm 包名一次都没有发布过
        return [
          1,
          {
            error: err,
            npm,
            version,
            message: '[ERR checkAndQueryNpmTime] npm 包未发布! 禁止提交!',
          },
        ];
      }

      return [
        1,
        {
          error: err,
          npm,
          version,
          message: `[ERR checkAndQueryNpmTime] ${err.message}`,
        },
      ];
    });
}


module.exports = {
  getNpmInfo,
  getVersions,
  getLatestSemverVersion,
  getLatestVersion,
  getNpmTime,
  getNpmLatestSemverVersion,
};
