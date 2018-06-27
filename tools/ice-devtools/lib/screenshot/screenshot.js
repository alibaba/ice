const puppeteer = require('puppeteer');

module.exports = {
  /**
   * 截取页面中某个 DOM 元素
   *
   * @param {String} url 截图页面的地址
   * @param {String} selector 选择符
   * @param {String} path 图片存放的地址
   * @param {Object|Null} viewport 如何裁剪
   */
  async screenshotDOMElement(url, selector, path, viewport) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const defaultViewport = { width: 1240, height: 600, deviceScaleFactor: 2 };
    page.setViewport(viewport || defaultViewport);
    await page.goto(url);
    await this.screenBySelector(page, {
      // padding: viewport ? 0 : 10,
      path,
      selector,
      noClip: !!viewport
    });
    await browser.close();
  },
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
  async screenBySelector(page, opts = {}) {
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

    if (!rect) { throw Error(`Could not find element that matches selector: ${selector}.`); }

    return await page.screenshot({
      path,
      clip: opts.noClip ? null : {
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + (padding * 2),
        height: rect.height + (padding * 2)
      }
    });
  }
};