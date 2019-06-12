const updater = require('npm-updater');
const packageJson = require('../../package.json');
const log = require('./log');

module.exports = function () {
  const tag = 'latest';
  const updateMessage = `你可以执行 npm install ice-scripts@${tag} --save-dev 来安装此版本\n`;

  // 提醒用户安装最新版本
  return updater({
    package: packageJson,
    abort: false,
    tag,
    updateMessage,
    interval: '1d',
  }).catch((err) => {
    log.verbose('check updater error', err);
  });
};
