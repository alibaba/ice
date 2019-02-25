/* eslint wrap-iife:0 */
const debug = require('debug')('ice:screenshot:general');
const path = require('path');
const imagemin = require('imagemin');
const fs = require('fs');
const ora = require('ora');
const getType = require('../utils/type');
const logger = require('../utils/logger');
const createlocalServer = require('../utils/local-server');
const screenshotDOMElement = require('../utils/screenshot');
const message = require('../utils/message');
const getTempPath = require('../utils/temp-path');

module.exports = function screenshot(cwd, opt) {
  const type = getType(cwd);
  debug('type %s', type);
  if (!type) {
    logger.fatal(message.invalid);
  }

  const port = opt.port || 8990;
  const { selector, servePath, urlpath } = require(`./${type}/screenshot`)(cwd);
  const tempPath = getTempPath();
  const screenshotTempPath = path.join(tempPath, 'screenshot.png'); // 临时地址

  const url = `http://127.0.0.1:${port}${urlpath}`;

  (async function execute() {
    const server = createlocalServer(servePath, port);
    const spin = ora('screenshoting ...');
    spin.start();
    try {
      // 截取页面中某个元素的快照
      await screenshotDOMElement(url, selector, screenshotTempPath);

      // 图片压缩
      await imagemin([screenshotTempPath], cwd);

      // 删除未压缩的图像
      fs.unlinkSync(screenshotTempPath);
      spin.succeed('generate screenshot.png sucesss');
    } catch (error) {
      spin.fail('generate screenshot.png fail');
      logger.fatal(error);
    } finally {
      server.close();
      spin.stop();
      require(`./${type}/info`)(cwd, opt);
      opt.callback && opt.callback();
    }
  })();
};
