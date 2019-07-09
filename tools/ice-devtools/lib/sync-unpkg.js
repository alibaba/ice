
const chalk = require('chalk');

module.exports = function build() {
  console.log();
  console.log(chalk.yellow('[ERROR] 此功能已废弃，请更新 package version 后使用 npm publish 发布当前物料'));
  console.log();
  console.log(chalk.cyan('    npm publish'));
  console.log();
  console.log(chalk.yellow('安装成功后，根据以下规则生成物料数据 URL：'));
  console.log(chalk.cyan('https://unpkg.com/{{npmName}}@latest/build/materials.json'));
  console.log();
  console.log('升级访问 https://www.yuque.com/ice-team/wiki/cb36go');
  console.log();
};
