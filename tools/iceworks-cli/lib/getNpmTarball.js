const request = require('request-promise-native');
const semver = require('semver');
const log = require('./log');

/**
 * 获取指定 npm 包版本的 tarball
 */
module.exports = async function getNpmTarball(npm, version, registry) {
  const url = `${registry}/${npm}`;
  const body = await request({
    url,
    json: true,
  });

  if (!semver.valid(version)) {
    version = body['dist-tags'].latest;
  }

  if (
    semver.valid(version) &&
    body.versions &&
    body.versions[version] &&
    body.versions[version].dist
  ) {
    const tarball = body.versions[version].dist.tarball;
    log.verbose('getNpmTarball', tarball);
    return tarball;
  }

  throw new Error(`${name}@${version} 尚未发布`);
};
