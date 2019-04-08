const logger = require('./logger');
const glodlog = require('./glodlog');

const checkEnv = require('./helper/checkEnv');
const network = require('./network');
const spc = require('./spc');
const parse = require('url-parse');

const { app } = require('electron');

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
    error.name = 'process-error';
    logger.error(error);
  })
  .on('unhandledRejection', (reason, promise) => {
    const error = new Error(`App Unhandled Rejection at:, ${promise}, 'reason:', ${reason}`);
    error.name = 'process-unhandled-rejection';
    logger.error(error);
  })
  .on('uncaughtException', (error) => {
    error.name = 'process-uncaught-exception';
    logger.error(error);
  });

// 注册自定义协议,用于url唤起
app.setAsDefaultProtocolClient('iceworks');

app.on('ready', async () => {
  if (isDev) {
    await installExtensions();
  }
  // settings.clear();
  logger.info('process.version:', process.version);
  logger.info('process.platform:', process.platform);
  logger.info('process.arch:', process.arch);
  logger.info('process.versions.modules:', process.versions.modules);
  glodlog.record({
    type: 'app', 
    action: 'launch',
    version: app.getVersion()
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

app.on('will-finish-launching', () => {
  // 监听，处理从url唤起iceworks的参数
  app.on('open-url', (event, url) => {
    // url = iceworks://?to=scaffolds
    const query = parse(url, true).query;
    if (Object.keys(query).length > 0) {
      settings.set('urlEvokeQuery', query);
    }
  });
});
