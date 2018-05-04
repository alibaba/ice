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

function queryNpmTime(
  npm,
  version = 'latest',
  registry = 'http://registry.npmjs.com'
) {
  return axios(`${registry}/${npm.replace(/\//g, '%2f')}/`)
    .then((response) => response.data)
    .then((data) => data.time)
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        console.error(
          '[WARN queryNpmTime] 未发布的 npm 包',
          npm,
          '@',
          version,
          '发布时间和更新时间为 Null'
        );
      } else {
        console.error('[WARN queryNpmTime] failed request with err');
      }
      throw err;
    });
}
exports.queryNpmTime = queryNpmTime;
