const path = require('path');
const spawn = require('cross-spawn');
const { getNpmTarball, getNpmRegistry } = require('ice-npm-utils');
const extractTarball = require('./extractTarball');

const NPM_NAME = 'iceworks-server';
const DEST_DIR = path.join(__dirname, '../', 'server');

/**
 * Download npm package content to the specified directory
 * @param {string} npmName npm package name
 * @param {string} destDir target directory
 */
function downloadServer(npmName, destDir) {
  console.log('>>> start downloading code');
  return getNpmTarball(npmName, 'latest')
    .then((url) => {
      return extractTarball(url, destDir);
    })
    .then((res) => {
      if (res.length) {
        console.log('>>> download completed');
        console.log('>>> start installing dependencies');
        install(destDir);
      }
    })
}

function install(cwd) {
  const child = spawn('npm', ['install', '--registry', getNpmRegistry()], {
    stdio: 'inherit',
    cwd,
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
