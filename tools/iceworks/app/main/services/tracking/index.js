const { webContents } = require('electron');
const log = require('../../logger');

const events = {
  checkingPathValid: '正在检查路径是否合法',
  getBlockDeps: '正在获取区块依赖',
  generateLayout: '正在生成 Layout 文件',
  installBlockDeps: '正在下载区块依赖',
  installLayoutDeps: '正在下载 Layout 依赖',
  generateBlocks: '正在生成区块',
  generatePage: '正在生成页面文件',
  appendConfig: '正在添加路由配置'
};

function emitProcess(eventName, blockName = '') {
  const contents = webContents.getAllWebContents();
  contents.forEach((content) => {
    content.send('processTracking', events[eventName] + blockName, eventName);
  });
  log.info(eventName);
}

function emitError(errorName, args) {
  log.debug(errorName, JSON.stringify(args));
}

function emitProgress(visible) {
  const contents = webContents.getAllWebContents();
  contents.forEach((content) => {
    content.send('progressVisible', visible);
  });
}

module.exports = { emitProcess, emitError, emitProgress };
