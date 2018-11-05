const { resolve, join } = require('path');
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

/**
 * 检测 NPM 包是否已发送，并返回包的发布时间
 * @param  {string} npm      package name
 * @param  {String} version  pacage version
 * @param  {String} registry npm registry
 * @return {array}
 *         [code, resute]
 */
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
      return [0, data.time];
    })
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        // 这种情况是该 npm 包名一次都没有发布过
        return [
          1,
          {
            error: err,
            npm,
            version,
            message: '[ERR checkAndQueryNpmTime] 未发布的 npm 包',
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
exports.checkAndQueryNpmTime = checkAndQueryNpmTime;

/**
 * 区分 组件 or 区块
 * component or block
 */
exports.getType = function getType(workDir) {
  const pkg = require(join(workDir, 'package.json'));
  let type = 'block';
  if (
    Array.isArray(pkg.keywords) &&
    pkg.keywords.some((kw) => {
      return /component/.test(kw);
    })
  ) {
    type = 'component';
  }
  return type;
};
