const log = require('./logger');
global.log = log;

const checkEnv = require('./helper/checkEnv');
const network = require('./network');
const spc = require('./spc');

const { app, dialog } = require('electron');

const { appMenu } = require('./menu');
const { registerApp, registerShortcut } = require('./app');
const { createHomeWindow, createTouchBar } = require('./windowList');
const ipcService = require('./ipcService');
const { isDev } = require('./shared');
const { register: registerUpdater } = require('./autoUpdater');
// renderer process shared services object
const services = require('./services');

const { settings } = services;
global.services = services;

const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
} = require('electron-devtools-installer');

const installExtensions = async () => {
  return installExtension(REACT_DEVELOPER_TOOLS);
};

const windows = {};
global.windows = windows;
// Hook createTouchBar on services
services.createTouchBar = createTouchBar;

process
  .on('error', (error) => {
    log.error(error.stack);
    log.report('app', {
      type: 'error',
      error: JSON.stringify(error.message),
    });
    dialog.showMessageBox({
      title: '程序异常',
      type: 'error',
      message: error.message,
      callback: () => {
        app.quit();
      },
    });
  })
  .on('unhandledRejection', (reason, promise) => {
    log.error(`App Unhandled Rejection at:, ${promise}, 'reason:', ${reason}`);
    log.report('app', {
      type: 'unhandled-rejection',
      reason,
      promise,
    });
    dialog.showMessageBox({
      title: '程序异常',
      type: 'error',
      message: `App Unhandled Rejection at:, ${promise}, 'reason:', ${reason}`,
      callback: () => {
        app.quit();
      },
    });
  })
  .on('uncaughtException', (error) => {
    log.error(error.stack);
    log.report('app', {
      type: 'uncaught-exception',
      error: JSON.stringify(error.message),
    });
    dialog.showMessageBox({
      title: '程序异常',
      type: 'error',
      message: `App uncaughtException$-${error}`,
      callback: () => {
        app.quit();
      },
    });
  });

app.on('ready', async () => {
  if (isDev) {
    await installExtensions();
  }
  // settings.clear();
  log.info('process.version:', process.version);
  log.info('process.platform:', process.platform);
  log.info('process.arch:', process.arch);
  log.info('process.versions.modules:', process.versions.modules);
  log.report('app', {
    action: 'launch',
    version: app.getVersion(),
    platform: process.platform,
    arch: process.arch,
  });
  settings.init();
  const homeWindow = createHomeWindow(app);
  windows.home = homeWindow;
  // 挂载所有 window 对象到 app 上。
  app.windows = windows;
  global.windows = windows;

  spc.bindWindow(homeWindow);
  appMenu(app, windows);
  registerApp(app, windows);
  registerShortcut(app, windows);
  if (!isDev) {
    registerUpdater(app, windows);
  }
  ipcService.init();

  checkEnv();
  // 强制设置为外网环境，用于测试外网环境下的状态
  if (settings.get('forceNotAlibaba')) {
    settings.set('isAlibaba', false);
  } else {
    // 根据用户网络环境，设置内外网状态。
    const isAlibaba = await network.isAlibaba();
    settings.set('isAlibaba', isAlibaba);
  }
});
