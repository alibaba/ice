
const chalk = require('chalk');

module.exports = function build() {
  console.log();
  console.log(chalk.yellow('[ERROR] 此功能已废弃，请安装 ice-screenshot 截图'));
  console.log();
  console.log(chalk.cyan('    npm install ice-screenshot --save-dev'));
  console.log();
  console.log(chalk.yellow('安装完成后，请更改 package.json 中的 npm scripts'));
  console.log();
  console.log(chalk.yellow('对于 scaffold:'));
  console.log(chalk.cyan('"screenshot": "idev screenshot" -> "screenshot": "screenshot -l"'));
  console.log(chalk.yellow('对于 block:'));
  console.log(chalk.cyan('"screenshot": "idev screenshot" -> "screenshot": "screenshot -l -s \\\\#mountNode"'));
  console.log();
  console.log('升级访问 https://github.com/alibaba/ice/wiki/ice-devtools-upgrade');
  console.log();
};
