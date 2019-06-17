#!/usr/bin/env node

const spawn = require('cross-spawn');
const program = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const path = require('path');

const packageJSON = require('../package.json');

const cwd = process.cwd();

exec();

async function exec() {
  program
    .version(packageJSON.version)
    .usage('-u https://www.example.com')
    .option('-u, --url <url>', 'The target url')
    .option('-s, --selector <selector>', 'Select a element through CSS selector')
    .option('-o, --output <output>', 'Output path')
    .parse(process.argv);

  const { url, selector, output } = program;

  if (!url) {
    console.log(chalk.red('The -u parameter is required! Using the following command:'));
    console.log(chalk.red('screenshot -u https://www.example.com\n'));
    program.help();
  }

  await screenshot(url, selector, output);
}

/**
 * take a screenshot of web page
 *
 * @param {string} url the target url
 * @param {string} selector CSS selector
 * @param {string} output output path
 */
async function screenshot(url, selector, output) {
  // a terminal spinner
  const spinner = ora('screenshoting ...').start();

  try {
    output = output || path.join(cwd, 'screenshot.jpg');
    const puppeteer = await getPuppeteer();

    // start puppeteer
    const browser = await puppeteer.launch();

    // create a new page
    const page = await browser.newPage();

    // set page's viewport
    page.setViewport({
      width: 1240,
      height: 600,
      deviceScaleFactor: 2,
    });

    // visit the target url
    await page.goto(url);

    if (selector) {
      // screenshot a element through CSS selector;
      const el = await page.$(selector);
      await el.screenshot({ path: output });
    } else {
      // screenshot full page
      await page.screenshot({ path: output });
    }

    // close chromium
    await browser.close();

    spinner.succeed(chalk.green('Screenshot success!'));
    console.log(chalk.green(`Screenshot output path: ${output}`));
  } catch (err) {
    spinner.fail(chalk.red('Screenshot fail!'));
    console.log(chalk.red('\n\nPlease install puppeteer using the following commands:'));
    console.log(chalk.white('\n  npm uninstall puppeteer -g'));
    console.log(chalk.white('\n  PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org npm i puppeteer -g --registry=https://registry.npm.taobao.org'));
    console.log(chalk.white('\n  idev screenshot\n'));
    console.log(err);
    process.exit(1);
  }
}

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
async function getPuppeteer() {
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
          const result = spawn.sync('npm', ['install', 'puppeteer@1.17.0', '-g', '--registry', 'https://registry.npm.taobao.org'], { stdio: 'inherit' });
          spawn.sync('npm', ['config', 'delete', 'puppeteer_download_host']);

          // get spawn error, exit with code 1
          if (result.error) {
            console.log(chalk.red('\n\nInstall Error. \nPlease manual install puppeteer using the following commands:'));
            console.log(chalk.white('\n  npm uninstall puppeteer -g'));
            console.log(chalk.white('\n  PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org npm i puppeteer -g --registry=https://registry.npm.taobao.org'));
            console.log(chalk.white('\n  idev screenshot\n'));
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
}
