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
      const materialType = pkgJSON.materialConfig.type;
      const materialUrl = (isTnpm ? 'http://unpkg.alibaba-inc.com/' : 'http://unpkg.com/') + `${pkgJSON.name}@latest/build/${materialType}-materials.json`;

      console.log();
      // console.log(chalk.cyan('material json sync success!'));
      console.log(chalk.cyan('物料源同步成功!'));
      console.log();
      console.log(chalk.yellow(materialUrl));
      console.log();
      console.log('如果初次使用，请拷贝上面的物料地址，到 iceworks 中开始私有物料配置');
      console.log();
      console.log('如果已经接入 iceworks，刷新物料面板即可查看更新后的物料');
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