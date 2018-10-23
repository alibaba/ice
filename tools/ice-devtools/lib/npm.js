const request = require('request');
const debug = require('debug')('ice:generator:npm');
const semver = require('semver');
const chalk = require('chalk');

const cacheData = {};

module.exports = {
  /**
   * 从 register 获取 npm 的信息
   */
  getNpmInfo: function(npm) {
    if (cacheData[npm]) {
      return Promise.resolve(cacheData[npm]);
    }

    return new Promise(function(resolve, reject) {
      request(
        {
          url: `http://registry.npmjs.com/${npm}`,
          json: true,
        },
        function(err, res, body) {
          if (err || body.error) {
            return reject(err || new Error(body.error));
          } else {
            cacheData[npm] = body;
            return resolve(body);
          }
        }
      );
    });
  },

  /**
   * 获取某个 npm 的所有版本号
   */
  getVersions: function(npm) {
    return this.getNpmInfo(npm).then(function(body) {
      const versions = Object.keys(body.versions);
      return versions;
    });
  },

  /**
   * 根据指定 version 获取符合 semver 规范的最新版本号
   *
   * @param {String} baseVersion 指定的基准 version
   * @param {Array} versions
   */
  getLatestSemverVersion: function(baseVersion, versions) {
    versions = versions
      .filter((version) => semver.satisfies(version, `^${baseVersion}`))
      .sort((a, b) => {
        return semver.gt(b, a);
      });
    return versions[0];
  },

  /**
   * 根据指定 version 和包名获取符合 semver 规范的最新版本号
   *
   * @param {String} npm 包名
   * @param {String} baseVersion 指定的基准 version
   */
  getNpmLatestSemverVersion: function(npm, baseVersion) {
    const self = this;
    return this.getVersions(npm).then(function(versions) {
      return self.getLatestSemverVersion(baseVersion, versions);
    });
  },

  /**
   * 获取某个 npm 的最新版本号
   *
   * @param {String} npm
   */
  getLatestVersion: function(npm) {
    return this.getNpmInfo(npm).then(function(data) {
      if (!data['dist-tags'] || !data['dist-tags'].latest) {
        console.error(chalk.red('没有 latest 版本号', data));
        return Promise.reject(new Error('没有 latest 版本号'));
      }

      const latestVersion = data['dist-tags'].latest;
      debug('latestVerion', npm, latestVersion);
      return latestVersion;
    });
  },
};
