const goldlog = require('./utils/goldlog');
const pkgData = require('../package.json');
const log = require('./utils/log');

/**
 * 初始化项目
 *
 * @param {String} cwd 项目目录
 * @param {Object} options 命令行参数
 */
module.exports = async function(cliOptions) {
  goldlog('version', {
    version: pkgData.version
  });
  goldlog('init', cliOptions);
  log.verbose('init cliOptions', cliOptions);

  let { scaffold } = cliOptions || {};

  if (!scaffold) {

  }

  log.info('init hahah')
};
