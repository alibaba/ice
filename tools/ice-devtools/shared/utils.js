const { resolve } = require('path');
const { readFileSync } = require('fs');
const axios = require('axios');

function keys(obj) {
  return Object.keys(obj);
}
exports.keys = keys;

function getCwd() {
  return process.cwd();
}

function findMaterials() {
  const pkg = getPkgJson();
  if (!('materials' in pkg)) {
    return null;
  }
  return pkg.materials;
}
exports.findMaterials = findMaterials;

function getPkgJson() {
  const cwd = getCwd();
  const json = JSON.parse(readFileSync(resolve(cwd, 'package.json'), 'utf-8'));
  return json;
}
exports.getPkgJson = getPkgJson;

function checkAndQueryNpmTime(
  npm,
  version = 'latest',
  registry = 'http://registry.npmjs.com'
) {
  const packageRegistryUrl = `${registry}/${npm.replace(/\//g, '%2f')}/`;
  return axios(packageRegistryUrl)
    .then((response) => response.data)
    .then((data) => {
      if (!data.time) {
        throw new Error('time 字段不存在');
      }
      if (
        !data.versions ||
        typeof data.versions[data['dist-tags'][version] || version] ===
          'undefined'
      ) {
        console.log(packageRegistryUrl);
        throw new Error(`${npm}@${version} 未发布! 禁止提交!`);
      }
      return data.time;
    })
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        // 这种情况是该 npm 包名一次都没有发布过
        console.error('[ERR checkAndQueryNpmTime] 未发布的 npm 包', npm);
      } else {
        console.error(`[ERR checkAndQueryNpmTime] ${err.message}`, err);
      }
      process.exit(1);
    });
}
exports.checkAndQueryNpmTime = checkAndQueryNpmTime;
