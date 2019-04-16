const ipc = require('node-ipc');
const { dialog } = require('electron');

const sendToWebContents = require('./helper/sendToWebContents');
const logger = require('./logger');

const networkPort = 8000;

ipc.config.id = 'iceworks';
ipc.config.silent = true;
ipc.config.networkPort = networkPort;

/**
 * ipc 服务，用于跨进程间的通信
 * 其他进程链接 ipc 服务后，进程则会挂起，不会主动退出。例如 build 命令就无法执行完成后主动退出。
 */
ipc.serveNet(() => {
  ipc.server.on('message', ({ message, path: projectPath }) => {
    if (message.type === 'sdk_status') {
      // 仅有 dev 需要与页面互通状态
      sendToWebContents(global.windows.home, 'sdk-dev-status', {
        message,
        path: projectPath,
      });
    } else if (message.action === 'update_project') {
      sendToWebContents(global.windows.home, 'update_project', {
        message,
        path: projectPath,
      });
    } else {
      logger.warn('未处理的消息内容', message);
    }
  });
});

ipc.server.on('error', (error) => {
  if (error) {
    if (error.message && /listen eaddrinuse/i.test(error.message)) {
      dialog.showErrorBox(
        '启动异常',
        'Iceworks IPC 启动失败，可能启动了多个 Iceworks 请先退出'
      );
    }

    error.message = `iceworks ipc Got an ERROR!: ${error.message}`;
    logger.error(error);
  }
});

module.exports = {
  init: () => {
    ipc.server.start();
    logger.info('iceworks ipc started at', networkPort);
  },
};
