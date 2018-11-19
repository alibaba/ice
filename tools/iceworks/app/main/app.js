const { ipcMain, BrowserWindow } = require('electron');

// 主进程业务代码
// 事件前缀规范
// global- 全局通用方法
// project- 项目相关
// sdk- 跟 SDK 操作相关
// generate- 跟模板、脚手架生成器相关

const { globalShortcut } = require('electron');

const log = require('./logger');
const { isWin, isMac } = require('./shared');
const dau = require('./dau');
const sessions = require('./services/sessions');

if (isMac) {
  // 执行环境附带 /usr/local/bin
  process.env.PATH = ['/usr/local/bin', process.env.PATH].join(':');
}

/**
 * 注册 app 交互事件，ipcMain 等事件
 * @param {*} app electron.app
 * @param {Object} windows window 对象合集
 */
/* eslint no-console:off */
exports.registerApp = (app, windows) => {
  app
    .on('will-quit', () => {
      console.log('will-quit');
    })
    .on('window-all-closed', () => {
      console.log('window-all-closed');
      // 等待进程都关闭后退出程序
      if (isWin) {
        sessions.manager
          .destory()
          .then(() => {
            app.quit();
          })
          .catch(() => {
            app.quit();
          });
      } else {
        sessions.manager
          .destory()
          .then(() => {})
          .catch(() => {});
        // not run quit in darwiwn
        // https://github.com/alibaba/ice/issues/56
        // app.quit();
      }
    })
    .on('before-quit', () => {
      log.report('app', { action: 'before-quit' });
      console.log('before-quit');
      if (isMac) {
        BrowserWindow.getAllWindows().forEach((currentWindow) => {
          currentWindow.destroy();
        });
      }
    })
    .on('activate', () => {
      windows.home.show();
      windows.home.focus();
    });

  ipcMain.on('setTitle', (event, title) => {
    windows.home.setTitle(title);
  });

  windows.home.on('focus', ({ sender }) => {
    // DAU 激活统计
    dau.record();
    sender.webContents.send('focus');
  });
};

/**
 * 注册全局快捷键
 * @param {*} app electron.app
 * @param {Object} windows window 实例合集
 */
exports.registerShortcut = (app, windows) => {
  // TODO 支持自定义快捷键
  const shortcutKey = 'CommandOrControl+alt+P';
  // settings.get('userconfig.shortcutKey') || 'CommandOrControl+alt+I';

  const ret = globalShortcut.register(shortcutKey, () => {
    windows.home.show();
  });

  if (ret) {
    log.info('shortcutKey register success', shortcutKey);
    log.report('app', {
      action: 'shortcut-key',
      shortcutKey: shortcutKey,
    });
  }

  app.on('will-quit', () => {
    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
  });
};
