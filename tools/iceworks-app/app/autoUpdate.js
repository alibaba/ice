const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const { ipcMain, Notification, BrowserWindow, shell } = require('electron');
const getURL = require('./getURL');

let win = null;

// set autoUpdater
autoUpdater.autoDownload = false;
autoUpdater.logger = log;
autoUpdater.on('update-available', (info) => {
  if (win) {
    sendStatusToWindow('update-available', info);
  } else {
    const notification = new Notification({
      title: `存在可用更新 (${info.version})`,
      body: '点击进入更新，体验新版',
    });
    notification.on('click', () => {
      log.info('notification click');
      showWindow();
    });

    log.info('notification show');
    notification.show();
  }
});
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('update-not-available', info);
});
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('update-downloaded', info);
});
autoUpdater.on('download-progress', (meta) => {
  sendStatusToWindow('download-progress', meta);
});
autoUpdater.on('error', (error) => {
  sendStatusToWindow('error', error);
});

// set ipcMain event
ipcMain.on('updater-setContentSize', (event, { width, height }) => {
  if (win) {
    win.setContentSize(width, height);
  }
});
ipcMain.on('updater-checkForUpdates', () => {
  autoUpdater.checkForUpdates().catch((error) => {
    sendStatusToWindow('error', error);
    log.error('Failed handling checkForUpdates:', error);
  });
});
ipcMain.on('updater-downloadUpdate', () => {
  autoUpdater.downloadUpdate().catch((error) => {
    sendStatusToWindow('error', error);
    log.error('Failed handling downloadUpdate:', error);
  });
});
ipcMain.on('updater-quitAndInstall', () => {
  autoUpdater.quitAndInstall();
});
ipcMain.on('updater-close', () => {
  win.close();
});

function sendStatusToWindow(event, meta = null) {
  log.info('[run][sendStatusToWindow]', event, meta);

  if (win && !win.isDestroyed()) {
    // eslint-disable-next-line
    win.webContents.send.apply(win.webContents, ['updater-message', { event, meta }]);
  }
}

function createWindow() {
  const updaterWindow = new BrowserWindow({
    backgroundColor: '#ECECEC',
    center: true,
    frame: true,
    fullscreenable: false,
    height: 83,
    width: 320,
    maximizable: false,
    minimizable: false,
    resizable: false,
    show: false,
    title: '',
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
    },
  });

  const handleRedirect = (e, url) => {
    if (url !== updaterWindow.webContents.getURL()) {
      e.preventDefault();
      shell.openExternal(url);
    }
  };
  updaterWindow.webContents.on('will-navigate', handleRedirect);
  updaterWindow.webContents.on('new-window', handleRedirect);

  updaterWindow.setMenu(null);
  updaterWindow.loadURL(getURL('updater'));

  return updaterWindow;
}

function showWindow() {
  log.info('show window...');
  if (win) {
    win.show();
    win.focus();
  } else {
    win = createWindow();
    win.on('ready-to-show', () => {
      win.show();
    });
    win.on('close', () => {
      win.destroy();
      win = null;
    });
  }
}

function register() {
  log.info('Updater starting...');

  autoUpdater.checkForUpdates().catch((error) => {
    log.error('Failed handling checkForUpdates:', error);
  });

  setInterval(() => {
    autoUpdater.checkForUpdates().catch((error) => {
      sendStatusToWindow('error', error);
      log.error('Failed handling checkForUpdates:', error);
    });
  }, 1000 * 60 * 60 * 3);
};

module.exports = { register, showWindow };
