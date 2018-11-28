const request = require('request');
const semver = require('semver');
const settings = require('../services/settings');
const logger = require('../logger');

/**
 * 请求一个包的描述信息
 * @param name 包名
 * @param version 版本默认 latest
 * @param registry 总是以为指定的为准，否则读取用户的设置项
 *
 */
module.exports = function npmRequest({ name, version = 'latest', registry }) {
  const userRegistry = settings.get('registry');
  let registryUrl = registry || userRegistry || 'https://registry.npmjs.com';
  registryUrl = registryUrl.replace(/\/$/, '');
  const pkgUrl = `${registryUrl}/${name.replace(/\//g, '%2f')}`;
  logger.debug('npmRequest', pkgUrl);
  return new Promise((resolve, reject) => {
    request({ url: pkgUrl, json: true }, (err, response, json) => {
      if (err || !json) {
        reject(err || new Error(JSON.stringify(response.body)));
      } else {
        if (!semver.valid(version)) {
          version = json['dist-tags'][version];
        }

        if (semver.valid(version)) {
          if (json && json.versions && json.versions[version]) {
            resolve(json.versions[version]);
          } else {
            reject(new Error(`${name}@${version} 尚未发布在 ${registryUrl}`));
          }
        } else {
          reject(new Error(`${name}@${version} 尚未发布在 ${registryUrl}`));
        }
      }
    });
  });
};
