const glob = require('glob');
const path = require('path');
const fs = require('fs');
const co = require('co');
const npminstall = require('npminstall');
const buildblockCmd = require('./build-block');
const screenshotCmd = require('./screenshot');
const chalk = require('chalk');

async function buildBlock(blockPath) {
  console.log(chalk.cyan(`${blockPath} build start`));
  await co(function * (){
    yield npminstall({
      root: blockPath,
      registry: 'https://registry.npm.taobao.org',
    });
  });
  await new Promise(resl => buildblockCmd({cwd: blockPath, cb: resl}));
  await new Promise(resl => screenshotCmd({cwd: blockPath, cb: resl}));

  console.log(chalk.green(`${blockPath} build done`));
  console.log('');

}

module.exports = function(opts) {
  const {cwd} = opts;
  const pkgPath = path.resolve(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error('package.json not exists.');
  }

  const blocksPath = path.join(cwd, '/react-materials/blocks/*');

  const blockPaths = glob.sync(blocksPath);
  let promise = blockPaths.reduce((promise, blockpath) => promise.then(() => buildBlock(blockpath)), Promise.resolve());
  promise.then(() => console.log(chalk.blue('all done'))).catch(err => console.error(err));
};
