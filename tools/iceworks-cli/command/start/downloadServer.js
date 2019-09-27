const path = require('path');
const spawn = require('cross-spawn');
const userHome = require('user-home');
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

  child.on('close', () => {
    console.log('>>> install completed');
  });
}

downloadServer(NPM_NAME, DEST_DIR).catch((err) => {
  console.log(err);
  process.exit(1);
});
