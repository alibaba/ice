const { BrowserWindow, ipcMain, dialog, shell } = require('electron');
const { windowURL, isMac, isWin } = require('./shared');

const createTouchBar = require('./createTouchBar');
const sessions = require('./services/sessions');

let quiting = false;
let forceClose = false;

function appStateKeeper(app, win) {
  // 安装程序的退出事件
  ipcMain.on('app-quit-install', () => {
    quiting = true;
  });
  app.on('before-quit', () => {
    quiting = true;
    console.log('before-quit on state keeper');
    if (!win.isDestroyed()) {
      win.destroy();
    }
  });

  win.on('close', (event) => {
    if (isMac) {
      if (!quiting) {
        event.preventDefault();
        win.hide();
      }
    } else {
      // windows 平台，给与提示
      if (
        (sessions.buildProxy.checkRuning() ||
          sessions.startProxy.checkRuning()) &&
        !forceClose
      ) {
        event.preventDefault();
        dialog.showMessageBox(
          {
            type: 'question',
            title: app.getName(),
            message: '项目正在运行中',
            detail: '是否终止任务，并立即退出？',
            buttons: ['取消', '确定'],
          },
          (choose) => {
            if (choose == 1) {
              forceClose = true;
              BrowserWindow.getAllWindows().forEach((currentWindow) => {
                currentWindow.destroy();
              });
            }
          }
        );
      } else {
        BrowserWindow.getAllWindows().forEach((currentWindow) => {
          currentWindow.destroy();
        });
      }
    }
  });
}

exports.createHomeWindow = function createHomeWindow(app) {
  const homeWindow = new BrowserWindow({
    title: app.getName(),
    backgroundColor: '#fefefe',
    width: isWin ? 890 : 870,
    height: isWin ? 630 : 600,
    minWidth: isWin ? 890 : 870,
    minHeight: isWin ? 630 : 600,
    resizable: true,
    center: true,
    show: true,
    title: '',
    fullscreenable: false,
    transparent: false,
    webPreferences: {
      preload: 'on',
    },
  });
  var handleRedirect = (e, url) => {
    if (url != homeWindow.webContents.getURL()) {
      e.preventDefault();
      shell.openExternal(url);
    }
  };
  // 拦截页面上的链接点击后用浏览器打开
  homeWindow.webContents.on('will-navigate', handleRedirect);
  homeWindow.webContents.on('new-window', handleRedirect);
  homeWindow.loadURL(windowURL('index'));
  appStateKeeper(app, homeWindow);

  return homeWindow;
};

exports.createUpdaterWindow = () => {
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
    },
  });

  var handleRedirect = (e, url) => {
    if (url != updaterWindow.webContents.getURL()) {
      e.preventDefault();
      shell.openExternal(url);
    }
  };
  // 拦截页面上的链接点击后用浏览器打开
  updaterWindow.webContents.on('will-navigate', handleRedirect);
  updaterWindow.webContents.on('new-window', handleRedirect);

  updaterWindow.setMenu(null);
  updaterWindow.loadURL(windowURL('updater'));

  return updaterWindow;
};

exports.openAboutWindow = () => {
  const aboutWindow = new BrowserWindow({
    width: 280,
    height: 200,
    title: '',
    resizable: false,
    center: true,
    show: true,
    fullscreenable: false,
    maximizable: false,
    minimizable: false,
    frame: true,
    backgroundColor: '#ECECEC',
    webPreferences: {
      backgroundThrottling: false,
    },
  });

  aboutWindow.setMenu(null);

  aboutWindow.loadURL(windowURL('about'));
};

exports.createTouchBar = createTouchBar;
