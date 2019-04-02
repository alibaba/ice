const kebabCase = require('kebab-case');
const chalk = require('chalk');
const { getNpmInfo } = require('ice-npm-utils');

/**
 * 获取 npm 包名
 * @param {string} name
 */
function generateNpmNameByPrefix(name, npmPrefix) {
  return npmPrefix + kebabCase(name).replace(/^-/, '');
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
    .then((data) => {
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
  generateNpmNameByPrefix,
  getNpmTime,
};
