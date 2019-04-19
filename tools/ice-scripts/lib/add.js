const goldlog = require('./utils/goldlog');
const pkgData = require('../package.json');
const log = require('./utils/log');

/**
 * 添加区块
 */
module.exports = async function (cliOptions) {
  goldlog('version', {
    version: pkgData.version,
  });
  goldlog('add', cliOptions);
  log.verbose('add cliOptions', cliOptions);

  const { template, baseDir = process.cwd(), type } = cliOptions || {};

  // check 项目根目录

  if (type === 'block') {
    if (!template) {
      // 添加空白区块

    } else {
      // 下载 npm 区块
    }
  } else {
    log.error('不支持的类型，目前仅支持 add block');
    process.exit(1);
  }
};
