const path = require('path');
const spawn = require('cross-spawn');
const userHome = require('user-home');
const chalk = require('chalk');
const getNpmTarball = require('../../lib/getNpmTarball');
const extractTarball = require('../../lib/extractTarball');

const NPM_NAME = 'iceworks-server';
const DEST_DIR = path.join(userHome, `.${NPM_NAME}`);
// 场景比较特殊，不需要走用户自定义的 config
const REGISTRY = process.env.REGISTRY || 'https://registry.npm.taobao.org';

/**
 * Download npm package content to the specified directory
 * @param {string} npmName npm package name
 * @param {string} destDir target directory
 */
function downloadServer(npmName, destDir) {
  console.log('>>> start downloading code', destDir);
  console.log('>>> ICEWORKS_CORE_VERSION:', process.env.ICEWORKS_CORE_VERSION);
  const version = process.env.ICEWORKS_CORE_VERSION ? process.env.ICEWORKS_CORE_VERSION : 'latest';
  return getNpmTarball(npmName, version, REGISTRY)
    .then((tarballURL) => {
      return extractTarball({ tarballURL, destDir });
    })
    .then((res) => {
      if (res.length) {
        console.log('>>> download completed');
        console.log('>>> start installing dependencies');
        install(destDir);
      }
    });
}

function install(cwd) {
  const child = spawn('npm', ['install', '--loglevel', 'silly', '--registry', REGISTRY], {
    stdio: ['pipe'],
    cwd,
  });

  child.stdout.on('data', data => {
    console.log(data.toString());
  });

  child.stderr.on('data', data => {
    console.log(data.toString());
  });

  child.on('error', error => {
    console.log(error);
    process.exit(1);
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log('>>> install completed');
    } else {
      console.log();
      console.log(chalk.red('提示：安装依赖失败，可通过以下步骤进行修复。'));
      console.log();
      console.log(chalk.green(`   1. cd ${DEST_DIR}`));
      console.log(chalk.green('   2. npm install --registry=https://registry.npm.taobao.org'));
      console.log();
      console.log(chalk.green('   确保依赖正常安装，然后重新启动 iceworks，如还不能正常启动，请通过钉钉群联系我们'));
      console.log(chalk.green('   钉钉群：https://ice.alicdn.com/assets/images/qrcode.png'));
      console.log();
      process.exit(1);
    }
  });
}

downloadServer(NPM_NAME, DEST_DIR).catch((err) => {
  console.log(err);
  process.exit(1);
});
