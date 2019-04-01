const spawn = require('cross-spawn');
const chalk = require('chalk');
const {
  getUnpkgHost,
  getNpmClient,
} = require('ice-npm-utils');

const pkg = require('../utils/pkg-json');

module.exports = function sync(cwd, opt) {
  const pkgJSON = pkg.getPkgJSON(cwd);
  const cmd = getNpmClient(pkgJSON.name);

  const process = spawn(cmd, ['publish'], { stdio: 'inherit' });

  process.on('close', (code) => {
    if (code == 0) {
      const materialType = pkgJSON.materialConfig.type;
      const materialJSON = materialType ? `${materialType}-materials.json` : 'materials.json';
      const materialUrl = `${getUnpkgHost(pkgJSON.name)}/${pkgJSON.name}@latest/build/${materialJSON}`;

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
      console.log('物料配置文档: https://alibaba.github.io/ice/docs/materials/devtools');
      console.log();
    } else {
      console.log();
      // console.log(chalk.red('material json sync failed!'));
      console.log('物料源同步失败!');
      console.log();
    }
  });
};
