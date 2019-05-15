/**
 * 根据 srouce 描述获取 tarbar url
 * @param {*} npm
 * @param {*} version
 * @example
 * "source":
 * {
    "type": "npm",
    "npm": "@icedesign/foo-block",
    "version": "0.1.5",
    "version-0.x": "1.0.0",
    "sourceCodeDirectory": "src",
  },
  * "projectVersion": "1.x" // "0.x"

 */
const to = require('await-to-js').default;
const npmRequest = require('../../utils/npmRequest');
const { getEnv } = require('../../env');

const env = getEnv();

module.exports = function getTarballURLBySource(source = {}, projectVersion) {
  return new Promise(async (resolve, reject) => {
    let version = source.version;
    // 注意！！！ 由于接口设计问题，version-0.x 字段实质指向1.x版本！
    if (projectVersion === '1.x') {
      // 兼容没有'version-0.x'字段的情况
      version = source['version-0.x'] || source.version;
    }

    const registry =
      typeof source.npm === 'string' && source.npm.startsWith('@icedesign')
        ? 'https://registry.npm.taobao.org'
        : env.npm_config_registry || source.registry;

    const [err, pkgData] = await to(
      npmRequest({
        name: source.npm,
        version,
        registry,
      })
    );
    if (err) {
      reject(err);
    } else {
      resolve(pkgData.dist.tarball);
    }
  });
};
