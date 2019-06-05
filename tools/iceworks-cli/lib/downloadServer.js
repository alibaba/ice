const path = require('path');
const execa = require('execa');
const chalk = require('chalk');
const getTarball = require('./getTarball');
const extractTarball = require('./extractTarball');

const NPM_NAME = 'iceworks-server';
const DEST_DIR = path.join(process.cwd(), 'server');

/**
 * Download npm package content to the specified directory
 * @param {string} npmName npm package name
 * @param {string} destDir target directory
 */
function downloadServer(npmName, destDir) {
  return getTarball(npmName)
    .then((url) => {
      return extractTarball(url, destDir);
    })
    .then((res) => {
      if (res.length) {
        console.log(chalk.green('[download successful]'));
        return install(destDir);
      }
    })
    .then((res) => {
      if (res.code === 0) {
        console.log(chalk.green('[install successful]'));
      }
    });
}

function install(cwd) {
  return execa.shell('npm install', {
    stdio: 'inherit',
    cwd,
  });
}

downloadServer(NPM_NAME, DEST_DIR).catch((err) => {
  console.log(err);
  process.exit(1);
});
