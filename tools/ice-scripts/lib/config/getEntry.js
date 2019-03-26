// 读取需要编译的文件
const path = require('path');

const paths = require('./paths');
const pkgData = require('./packageJson');
const getDemos = require('../component/getDemos');
const log = require('../utils/log');

/**
 * 获取项目中符合 src/pages/xxxx/index.jsx 的文件
 *
 * @return {Object} entry 的 kv 对象
 */

module.exports = function getEntry() {

  if (pkgData.type === 'component') {
    const entry = {};
    const demos = getDemos(paths.appDirectory);

    demos.forEach((demo) => {
      const demoName = demo.filename;
      const demoFile = path.join(paths.appDirectory, 'demo', `${demoName}.md`);
      entry[`__Component_Dev__.${demoName}`] = demoFile;
    });

    return entry;
  }

  let entry;
  // 兼容 iceworks 旧项目 package.json 里的 ice 字段。
  if (pkgData.ice && pkgData.ice.entry) {
    entry = pkgData.ice.entry;
  }

  if (pkgData.buildConfig && pkgData.buildConfig.entry) {
    entry = pkgData.buildConfig.entry;
  }

  if (entry) {
    // eslint-disable-next-line no-console
    log.info('package.json 存在 entry 配置');
    return entry;
  }
};
