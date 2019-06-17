
const chalk = require('chalk');

module.exports = function build() {
  console.log();
  console.log(chalk.yellow('[ERROR] 此功能已废弃，请安装 ice-screenshot 截图'));
  console.log();
  console.log(chalk.cyan('    npm install ice-screenshot -g'));
  console.log(chalk.cyan('    screenshot -u https://www.example.com'));
  console.log();
  console.log('升级访问 https://github.com/alibaba/ice/wiki/ice-devtools-upgrade');
  console.log();
};
