const spawn = require('cross-spawn');
const chalk = require('chalk');

function isNotFoundError(error = '') {
  return error.indexOf('Cannot find module') === 0;
}

/**
 * get Puppeteer(headless chromium)
 *
 * we don't want depend on puppeteer locally,
 * puppeteer take a long to install
 *
 */
module.exports = async function getPuppeteer() {
  try {
    // get Puppeteer from local node_modules
    return require('puppeteer');
  } catch (error) {
    if (isNotFoundError(error.message)) {
      try {
        // get Puppeteer from global node_modules
        return require('import-global')('puppeteer');
      } catch (importGlobalErr) {
        // if not found puppeteer from global node_modules
        // install it to global node_modules
        if (isNotFoundError(importGlobalErr.message)) {
          console.log(chalk.yellow('\n\nCannot find puppeteer in current environment.'));
          console.log(chalk.yellow('Installing globally puppeteer, please wait a moment.\n'));

          // set puppeteer download host
          // default download host has been blocking, use cnpm mirror
          // https://github.com/cnpm/cnpmjs.org/issues/1246#issuecomment-341631992
          spawn.sync('npm', ['config', 'set', 'puppeteer_download_host=https://storage.googleapis.com.cnpmjs.org']);
          const result = spawn.sync('npm', ['install', 'puppeteer@1.x', '-g', '--registry', 'https://registry.npm.taobao.org'], { stdio: 'inherit' });
          spawn.sync('npm', ['config', 'delete', 'puppeteer_download_host']);

          // get spawn error, exit with code 1
          if (result.error) {
            console.log(chalk.red('\n\nInstall Error. \nPlease install puppeteer using the following commands:'));
            console.log(chalk.white('\n  npm uninstall puppeteer -g'));
            console.log(chalk.white('\n  PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org npm i puppeteer -g --registry=https://registry.npm.taobao.org'));
            console.log(chalk.white('\n  screenshot -u http://www.example.com\n'));
            process.exit(1);
          }

          console.log(chalk.green('\nPuppeteer installed.\n'));
          return require('import-global')('puppeteer');
        }
        throw Error(importGlobalErr);
      }
    }
    throw Error(error);
  }
};
