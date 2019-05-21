const goldlog = require('../utils/goldlog');
const pkgData = require('../../package.json');
const log = require('../utils/log');
const addBlock = require('../utils/addBlock');

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

  if (type === 'block') {
    log.info('add block start');

    try {
      const blockDirPath = await addBlock({ template, baseDir });
      log.info('添加区块成功，在对应页面代码引入该区块即可生效', blockDirPath);
    } catch (err) {
      log.error('添加区块失败，建议检查对应目录是否已存在');
      log.error('', err);
    }
  } else {
    log.error(`不支持的类型 ${type}，目前仅支持 ice add block`);
    process.exit(1);
  }
};
