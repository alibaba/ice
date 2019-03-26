const updater = require('npm-updater');
const packageJson = require('../../package.json');

module.exports = function() {
  const tag = 'latest';
  const updateMessage = '你可以执行 npm install -g ice-scripts@' + tag + ' 来安装此版本\n';

  // 提醒用户安装最新版本
  return updater({
    package: packageJson,
    abort: false,
    tag,
    updateMessage,
    interval: '1d',
  }).catch(function(err) {
  });
}
