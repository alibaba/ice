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
      console.log(chalk.green('material json sync success!'));
      console.log();
      console.log(url);
      console.log();
    } else {
      console.log();
      console.log(chalk.red('material json sync failed!'));
      console.log();
    }
  });
};