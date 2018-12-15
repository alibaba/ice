// TODO：https://github.com/vladocar/screenshoteer
const puppeteer = require('puppeteer');
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
  return await page.screenshot({
    path,
    clip: opts.noClip
      ? null
      : {
          x: rect.left - padding,
          y: rect.top - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
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
}

module.exports = screenshotDOMElement;
