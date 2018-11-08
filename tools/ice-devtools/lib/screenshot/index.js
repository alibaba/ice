const path = require('path');
const fs = require('fs');

const localServer = require('./local-server');
const screenshot = require('./screenshot');

const port = 8999;

module.exports = function(opts) {
  const pkgPath = path.resolve(opts.cwd, 'package.json');

  if (!fs.existsSync(pkgPath)) {
    throw new Error('package.json not exists.');
  }

  const screenshotPath = path.join(opts.cwd, 'screenshot.png');
  const pkgInfo = require(pkgPath);

  (async () => {
    const server = localServer(opts.cwd, port);
    // 截取页面中某个元素的快照
    await screenshot.screenshotDOMElement(
      `http://127.0.0.1:${port}/build/index.html`,
      '#mountNode',
      screenshotPath,
      pkgInfo.blockConfig
        ? null
        : {
            width: 1240,
            height: 740,
            deviceScaleFactor: 2,
          }
    );

    console.info(screenshotPath, 'created');

    pkgInfo.blockConfig = Object.assign({}, pkgInfo.blockConfig || {}, {
      screenshot: `https://cdn.jsdelivr.net/npm/${pkgInfo.name}@latest/screenshot.png`
    })
    fs.writeFileSync(pkgPath, JSON.stringify(pkgInfo, null, 4), 'utf-8')
    server.close();
    opts.cb && opts.cb();
  })();
};
