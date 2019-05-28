const request = require('request');
const semver = require('semver');

/**
 * Get the npm package info
 * @param name package name
 * @param version package version
 * @param registry package registry
 */
module.exports = function npmRequest({ name, version = 'latest', registry }) {
  let registryUrl = registry || 'http://registry.npm.taobao.org';
  registryUrl = registryUrl.replace(/\/$/, '');
  const pkgUrl = `${registryUrl}/${name.replace(/\//g, '%2f')}`;
  return new Promise((resolve, reject) => {
    request(
      {
        url: pkgUrl,
        json: true,
        timeout: 5000,
      },
      (err, response, json) => {
        if (err || !json) {
          const error = err || new Error(JSON.stringify(response.body));
          error.name = 'get-tarball-info-error';
          error.data = {
            url: pkgUrl,
          };
          console.error(error);
          reject(error);
        } else {
          if (!semver.valid(version)) {
            version = json['dist-tags'][version];
          }
          if (
            semver.valid(version) &&
            json &&
            json.versions &&
            json.versions[version]
          ) {
            resolve(json.versions[version]);
          } else {
            const error = new Error(
              `${name}@${version} 尚未发布在 ${registryUrl}`
            );
            error.name = 'get-tarball-info-error';
            console.error(error);
            reject(error);
          }
        }
      }
    );
  });
};
