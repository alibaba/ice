// const screenshot = require('./screenshot');
const path = require('path');
const fs = require('fs');

const localServer = require('./local-server');
const screenshot = require('./screenshot');

const port = 8999;

module.exports = function (opts) {
    const pkgPath = path.resolve(opts.cwd, 'package.json');
    if (!fs.existsSync(pkgPath)) {
        throw new Error('package.json not exists.');
    }

    const screenshotPath = 'screenshot.png';

    (async () => {
        const server = localServer(opts.cwd, port);

        // 截取页面中某个元素的快照
        await screenshot.screenshotDOMElement(
            `http://127.0.0.1:${port}/demo/index.html`,
            'body',
            screenshotPath
        );

        console.info(path.resolve('screenshot.png'), 'created');

        server.close();
    })();
};
