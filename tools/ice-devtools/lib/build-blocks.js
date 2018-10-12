const glob = require('glob');
const path = require('path');
const fs = require('fs');
const co = require('co');
const npminstall = require('npminstall');
const buildblockCmd = require('./build-block');
const screenshotCmd = require('./screenshot');
const chalk = require('chalk');
const debug = require('debug')('ice:build-blocks');

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
  const pkgJSON = require(pkgPath);
  const reactMaterials = pkgJSON.materials.filter(material => material.type === 'react');

  let reactMaterial;
  if (reactMaterials.length < 1) {
    reactMaterial = {directory: 'react-materials'}
  } else {
    reactMaterial = reactMaterials[0];
  }

  const reactMaterialBaseDir = reactMaterial.directory;
  debug('reactMaterialBaseDir %s', reactMaterialBaseDir);
  const blocksPath = path.join(cwd, reactMaterialBaseDir, '/blocks/*');
  debug('blocksPath: %s', blocksPath);
  const blockPaths = glob.sync(blocksPath);
  debug('blockPaths: %j', blockPaths);
  let promise = blockPaths.reduce((promise, blockpath) => promise.then(() => buildBlock(blockpath)), Promise.resolve());
  promise.then(() => console.log(chalk.blue('all done'))).catch(err => console.error(err));
};
