const spawn = require('cross-spawn');
const chalk = require('chalk');

const pkg = require('../utils/pkg-json');
const innerNet = require('../utils/inner-net');

module.exports = function sync(cwd, opt) {
  const pkgJSON = pkg.getPkgJSON(cwd);
  const isTnpm = innerNet.isTnpm(pkgJSON.name);
  
  const cmd = isTnpm ? 'tnpm' : 'npm';

  const process = spawn(cmd, ['publish'], { stdio: 'inherit' });

  process.on('close', (code) => {
    if (code == 0) {
      console.log();
      const url = (isTnpm ? 'https://unpkg.alibaba-inc.com/' : 'https://unpkg.com/') + pkgJSON.name + '/build/react-materials.json';
      // console.log(chalk.cyan('material json sync success!'));
      console.log(chalk.cyan('物料源同步成功!'));
      console.log();
      console.log(chalk.yellow(url));
      console.log();
      console.log('刷新 ICEWorks 物料面板，即可查看更新后的物料');
      console.log();
      console.log('初次使用，请拷贝上面的物料地址，到 ICEWorks 中开始私有物料配置');
      console.log();
      console.log('物料配置文档: https://alibaba.github.io/ice/docs/materials/quick-start');
      console.log();
    } else {
      console.log();
      // console.log(chalk.red('material json sync failed!'));
      console.log('物料源同步失败!');
      console.log();
    }
  });
};