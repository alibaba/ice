const log = require('./logger');
const { ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const { createUpdaterWindow } = require('./windowList');

const sendToWebContents = require('./helper/sendToWebContents');
const notify = require('./services/interaction/notify');

autoUpdater.autoDownload = false;
autoUpdater.logger = log;
let win = null;

function sendStatusToWindow(event, meta = null) {
  log.info(event, meta);
  sendToWebContents(win, 'updater-message', {
    event: event,
    meta: meta,
  });
}

ipcMain.on('set-updater-window-size', (event, { width, height }) => {
  if (win) {
    win.setContentSize(width, height);
  }
});

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('checking-for-update');
});

autoUpdater.on('update-available', (info) => {
  if (win) {
    sendStatusToWindow('update-available', info);
  } else {
    notify({
      title: `存在可用更新 (${info.version})`,
      body: '点击进入更新，体验新版',
      type: 'info',
      onClick: () => {
        Updater.show();
      },
    });
  }
});

autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('update-not-available', info);
});

autoUpdater.on('error', (error) => {
  sendStatusToWindow('error', error);
});

autoUpdater.on('download-progress', (meta) => {
  sendStatusToWindow('download-progress', meta);
});

autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('update-downloaded', info);
});

const Updater = {
  show: () => {
    if (win) {
      win.show();
      win.focus();
    } else {
      win = createUpdaterWindow();
      win.on('ready-to-show', () => {
        win.show();
      });
      win.on('close', () => {
        win.destroy();
        win = null;
      });
    }
  },
  register: () => {
    setInterval(() => {
      autoUpdater.checkForUpdates().catch((e) => {
        sendStatusToWindow('error', e);
        log.error('Failed handling checkForUpdates:', e);
      });
      // 每间隔三小时监测软件更新
    }, 1000 * 60 * 60 * 3);

    ipcMain.on('updater-check', (event, data) => {
      // 检查更新
      autoUpdater.checkForUpdates().catch((e) => {
        sendStatusToWindow('error', e);
        log.error('Failed handling checkForUpdates:', e);
      });
    });
    ipcMain.on('updater-close', (event, data) => {
      // 关闭
      win.close();
    });
    ipcMain.on('updater-start', (event, data) => {
      // 开始下载
      autoUpdater.downloadUpdate().catch((e) => {
        sendStatusToWindow('error', e);
        log.error('Failed handling downloadUpdate:', e);
      });
    });
    ipcMain.on('updater-install', (event, data) => {
      // 退出并安装
      autoUpdater.quitAndInstall();
    });
    log.info('Updater starting...');
    // 自动检测更新
    autoUpdater.checkForUpdates().catch((e) => {
      log.error('Failed handling checkForUpdatesAndNotify:', e);
    });
  },
  checkForUpdatesAndNotify() {
    autoUpdater.checkForUpdatesAndNotify().catch((e) => {
      log.error('Failed handling checkForUpdatesAndNotify:', e);
    });
  },
};

module.exports = Updater;
