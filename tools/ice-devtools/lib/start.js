
const chalk = require('chalk');

module.exports = function build() {
  console.log();
  console.log(chalk.yellow('[ERROR] 此功能已废弃，请使用 ice-scripts 开发/构建'));
  console.log();
  console.log(chalk.cyan('    npm install ice-scripts@latest -g'));
  console.log(chalk.cyan('    ice build'));
  console.log();
  console.log('升级访问 https://www.yuque.com/ice-team/wiki/cb36go');
  console.log();
};
