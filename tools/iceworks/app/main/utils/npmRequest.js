const request = require('request');
const semver = require('semver');
const settings = require('../services/settings');
const logger = require('../logger');
const alilog = require('../alilog');
const autoRetry = require('./autoRetry');

/**
 * 请求一个包的描述信息
 * @param name 包名
 * @param version 版本默认 latest
 * @param registry 总是以为指定的为准，否则读取用户的设置项
 *
 */
function npmRequest({ name, version = 'latest', registry }) {
  const userRegistry = settings.get('registry');
  let registryUrl = registry || userRegistry || 'https://registry.npmjs.com';
  registryUrl = registryUrl.replace(/\/$/, '');
  const pkgUrl = `${registryUrl}/${name.replace(/\//g, '%2f')}`;
  logger.debug('npmRequest', pkgUrl);
  return new Promise((resolve, reject) => {
    request({
      url: pkgUrl,
      json: true,
      timeout: 5000,
    }, (err, response, json) => {
      if (err || !json) {
        const error = err || new Error(JSON.stringify(response.body));
        alilog.report({
          type: 'get-tarball-info-error',
          msg: error.message,
          stack: error.stack,
          data: {
            url: pkgUrl,
          },
        }, 'error');
        reject(error);
      } else {
        if (!semver.valid(version)) {
          version = json['dist-tags'][version];
        }
        if (semver.valid(version) && json && json.versions && json.versions[version]) {
          resolve(json.versions[version]);
        } else {
          const error = new Error(`${name}@${version} 尚未发布在 ${registryUrl}`);
          alilog.report({
            type: 'get-tarball-info-error',
            msg: error.message,
            stack: error.message,
          });
          reject(error);
        }
      }
    });
  });
}

// 超时自动重试
const retryCount = 2;
module.exports = autoRetry(
  npmRequest, 
  retryCount, 
  (err) => err.code && (err.code == 'ETIMEDOUT' || err.code == 'ESOCKETTIMEDOUT')
);