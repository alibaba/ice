// TODO：https://github.com/vladocar/screenshoteer
const spawn = require('cross-spawn');
const chalk = require('chalk');

function isNotFoundError(error = '') {
  return error.indexOf('Cannot find module') === 0;
}

/**
 * get Puppeteer(headless chromium)
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
          console.log(chalk.yellow('Installing puppeteer, please wait a moment.\n'));

          // set puppeteer download host
          // https://github.com/cnpm/cnpmjs.org/issues/1246#issuecomment-341631992
          spawn.sync('npm', ['config', 'set', 'puppeteer_download_host=https://storage.googleapis.com.cnpmjs.org']);
          const result = spawn.sync('npm', ['install', 'puppeteer@1.17.0', '-g', '--registry', 'https://registry.npm.taobao.org'], { stdio: 'inherit' });
          spawn.sync('npm', ['config', 'delete', 'puppeteer_download_host']);

          // if get spawn error, exit
          if (result.error) {
            console.log(chalk.red('\n\nScreenshot Error. \nPlease manual install puppeteer using the following commands:'));
            console.log(chalk.white('\n  npm uninstall puppeteer -g'));
            console.log(chalk.white('\n  PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org npm i puppeteer -g --registry=https://registry.npm.taobao.org'));
            console.log(chalk.white('\n  idev screenshot\n'));
            process.exit(1);
          }

          console.log(chalk.yellow('Puppeteer installed.\n'));
          return require('import-global')('puppeteer');
        }
        throw Error(importGlobalErr);
      }
    }
    throw Error(error);
  }
}

/**
 * 精确截取页面中某个元素的快照
 *
 * @param {Object} page puppeteer page 对象
 * @param {Object} opts 参数
 *  - @param {Number} opts.padding CSS padding
 *  - @param {String} opts.selector 截取那个元素的快照
 *  - @param {String} opts.path 图片存放到哪
 *  - @param {Boolean} opts.noClip 是否该裁剪
 * @returns {Promise}
 */
async function screenBySelector(page, opts = {}) {
  const padding = 'padding' in opts ? opts.padding : 0;
  const path = 'path' in opts ? opts.path : null;
  const selector = opts.selector;
  if (!selector) throw Error('Please provide a selector.');

  const rect = await page.evaluate((xpath) => {
    const element = document.querySelector(xpath);
    if (!element) return null;
    const { x, y, width, height } = element.getBoundingClientRect();
    return { left: x, top: y, width, height, id: element.id };
  }, selector);

  if (!rect) {
    throw Error(`Could not find element that matches selector: ${selector}.`);
  }

  // 页面渲染完毕后，开始截图
  /* eslint-disable-next-line no-return-await */
  return await page.screenshot({
    path,
    clip: opts.noClip
      ? null
      : {
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + (padding * 2),
        height: rect.height + (padding * 2),
      },
  });
}

/**
 * 截取页面中某个 DOM 元素
 *
 * @param {String} url 截图页面的地址
 * @param {String} selector 选择符
 * @param {String} path 图片存放的地址
 * @param {Object|Null} viewport 如何裁剪
 */
async function screenshotDOMElement(url, selector, path, viewport) {
  try {
    const puppeteer = await getPuppeteer();
    // 启动 puppeteer 创建一个 Browser 对象
    const browser = await puppeteer.launch();

    // 打开浏览器后，新建 Tab 页
    const page = await browser.newPage();

    // 默认 Viewpoint
    const defaultViewport = {
      width: 1240,
      height: 600,
      deviceScaleFactor: 2,
    };

    // 设置 Tab 页的尺寸，puppeteer 允许对每个 Tab 页单独设置尺寸
    page.setViewport(viewport || defaultViewport);

    // Tab 访问需要截图的页面，使用await可以等待页面加载完毕
    await page.goto(url);

    await screenBySelector(page, {
      path,
      selector,
      noClip: !!viewport,
    });

    // 关闭 Chromium
    await browser.close();
  } catch (err) {
    console.log(chalk.red('\n\nScreenshot Error. \nPlease manual install puppeteer using the following commands:'));
    console.log(chalk.white('\n  npm uninstall puppeteer -g'));
    console.log(chalk.white('\n  PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org npm i puppeteer -g --registry=https://registry.npm.taobao.org'));
    console.log(chalk.white('\n  idev screenshot\n'));
    process.exit(1);
  }
}

module.exports = screenshotDOMElement;
