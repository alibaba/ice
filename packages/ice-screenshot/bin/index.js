#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const detect = require('detect-port');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const jimp = require('jimp');

const createServer = require('../utils/createServer');
const getPuppeteer = require('../utils/getPuppeteer');
const packageJSON = require('../package.json');

const cwd = process.cwd();
const DEFAULT_PORT = 8100;

exec();

async function exec() {
  try {
    program
      .version(packageJSON.version)
      .usage('-u https://www.example.com')
      .option('-u, --url <url>', 'The target url or path to local server')
      .option('-l, --local [local]', 'Set up a local server in [local] directory and take screenshot, defaults set up in `./`')
      .option('-s, --selector <selector>', 'Select a element through CSS selector')
      .option('-o, --output <output>', 'Output path')
      .parse(process.argv);

    const { url, selector, local, thumbnail } = program;
    const output = program.output || path.join(cwd, 'screenshot.png');

    if (!url && !local) {
      console.log(chalk.red('The -u or -l is required! Using the following command:'));
      console.log(chalk.red('screenshot -u https://www.example.com\n'));
      program.help();
    }

    if (local) {
      const port = await detect(DEFAULT_PORT);
      const serverPath = local === true ? cwd : local;
      await screenshotWithLocalServer(serverPath, port, url, selector, output);
    } else {
      await screenshot(url, selector, output);
    }

    if (thumbnail) {
      const width = thumbnail === true ? 600 : Number(thumbnail);

      await generateThumbnail(output, width);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

/**
 * take a screenshot with local server
 *
 * @param {string} serverPath local server directory
 * @param {number} port server port
 * @param {string} targetUrl the target url
 * @param {string} selector the target CSS selector
 * @param {string} output output path
 */
async function screenshotWithLocalServer(serverPath, port, targetUrl, selector, output) {
  targetUrl = targetUrl
    ? `http://127.0.0.1:${port}${targetUrl}`
    : `http://127.0.0.1:${port}/build/index.html`; // default screenshot target

  const server = createServer(serverPath, port);
  console.log(chalk.white(`Create local server with port ${port}`));
  console.log(chalk.white(`The screenshot target url: ${targetUrl}`));

  await screenshot(targetUrl, selector, output);

  server.close();
}

/**
 * take a screenshot of web page
 *
 * @param {string} url the target url
 * @param {string} selector screenshot target CSS selector
 * @param {string} output output path
 */
async function screenshot(url, selector, output) {
  // a terminal spinner
  const spinner = ora('screenshoting ...').start();

  try {
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

    // screenshot a element through CSS selector;
    if (selector) {
      const el = await page.$(selector);

      if (!el) {
        throw Error(`Could not find element that matches selector: ${selector}.`);
      }

      await el.screenshot({ path: output });
    } else {
      // screenshot full page
      await page.screenshot({ path: output });
    }

    const outputDir = path.dirname(output);
    // minify screenshot
    await minifyImg(output, outputDir);

    // close chromium
    await browser.close();

    spinner.succeed(chalk.green('Screenshot success!'));
    console.log(chalk.green(`Screenshot output path: ${output}`));
  } catch (err) {
    spinner.fail(chalk.red('Screenshot fail!'));

    // chromium not download error
    // stdout reinstall puppeteer tips.
    if (err.message === 'Chromium revision is not downloaded. Run "npm install" or "yarn install"') {
      console.log(chalk.red('\n\nPuppeteer Install fail. \nPlease install puppeteer using the following commands:'));
      console.log(chalk.white('\n  npm uninstall puppeteer -g'));
      console.log(chalk.white('\n  PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org npm i puppeteer -g --registry=https://registry.npm.taobao.org'));
      console.log(chalk.white('\n  screenshot -u http://www.example.com\n'));
    } else {
      console.error(err);
    }
    process.exit(1);
  }
}

/**
 * gengrate a thumbnail of an image
 *
 * @param {*} imgPath
 * @param {number} [width=600]
 */
async function generateThumbnail(imgPath, width = 600) {
  try {
    const imgPathObj = path.parse(imgPath);
    const thumbnailPath = path.join(imgPathObj.dir, `${imgPathObj.name}_thumbnail${imgPathObj.ext}`);
    const image = await jimp.read(imgPath);
    image.resize(width, jimp.AUTO);
    image.write(thumbnailPath);

    // minify thumbnail
    await minifyImg(thumbnailPath, imgPathObj.dir);
    console.log(chalk.green(`Thumbnail output path: ${thumbnailPath}`));
  } catch (err) {
    console.error(chalk.red('Generate thumbnail failed!'));
    console.error(err);
    process.exit(1);
  }
}

/**
 * minify an image
 *
 * @param {String} imgPath
 * @param {*} outputDir output dir
 * @returns
 */
async function minifyImg(imgPath, outputDir) {
  return imagemin([imgPath], outputDir, {
    plugins: [imageminMozjpeg(), imageminPngquant()],
  });
}
