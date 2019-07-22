const { app, BrowserWindow, dialog } = require('electron');
const address = require('address');
const execa = require('execa');
const path = require('path');
const detectPort = require('detect-port');
const is = require('electron-is');
const log = require('electron-log');
const getEnv = require('./getEnv');

let mainWindow;
let serverProcess;
let setPort = '7001';

const isProduction = is.production();
const ip = address.ip();
const env = getEnv();
const serverDir = isProduction ? path.join(__dirname, '..', 'server') : path.join(__dirname, '..', '..', '..', 'packages', 'iceworks-server');
const loadingHTML = path.join(__dirname, 'loading.html');
const errorHTML = path.join(__dirname, 'error.html');

function getServerUrl() {
  return `http://${ip}:${setPort}/`;
}

async function startServerAndLoad() {
  if (mainWindow) {
    mainWindow.loadFile(loadingHTML);
  }

  if (!isProduction && mainWindow.webContents) {
    mainWindow.webContents.openDevTools({ mode: 'right' });
  }

  try {
    await execa('npm', ['stop'], { cwd: serverDir, env });
  } catch (error) {
    log.warn('[run][startServerAndLoad][start-server][stop] got error: ', error);
  }

  const args = isProduction ? ['start'] : ['run', 'dev'];
  setPort = await detectPort(setPort);
  serverProcess = execa('npm', args, {
    cwd: serverDir,
    env: {
      ...env,
      PORT: setPort,
    },
  });

  serverProcess.stdout.on('data', (buffer) => {
    const logInfo = buffer.toString();
    log.info('[run][startServerAndLoad][start-server] stdout:', logInfo);

    if (mainWindow) {
      if (mainWindow.webContents) {
        mainWindow.webContents.send('log', logInfo);
      }
      if (logInfo.search('started on') > 0) {
        mainWindow.loadURL(getServerUrl());
      }
    }
  });

  serverProcess.on('error', (buffer) => {
    log.error('[run][startServerAndLoad][start-server] error:', buffer.toString());
    if (mainWindow) {
      mainWindow.loadFile(errorHTML);
    }
  });

  serverProcess.stderr.on('data', (buffer) => {
    log.error('[run][startServerAndLoad][start-server] stderr:', buffer.toString());
  });

  serverProcess.on('exit', (code) => {
    log.error('[run][startServerAndLoad][start-server] exit width:', code);

    if (code === 1) {
      serverProcess = null;
      if (mainWindow) {
        mainWindow.loadFile(errorHTML);
      }
    }
  });
}

function createWindow() {
  log.info('[run][createWindow]');

  mainWindow = new BrowserWindow({ 
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // HACK skip window.beforeunload
  mainWindow.on('close', () => {
    mainWindow.destroy();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (!serverProcess) {
    log.info('[run][createWindow][start-server]');
    startServerAndLoad();
  } else {
    log.info('[run][createWindow][load-server]');
    mainWindow.loadURL(getServerUrl());
  }
}

function stopServerAndQuit() {
  log.info('[run][stopServerAndQuit]');

  // TODO The following call does not take effect
  if (mainWindow) {
    mainWindow.loadFile(loadingHTML);
  }

  const stopProcess = execa('npm', ['stop'], { cwd: serverDir, env });

  stopProcess.stdout.on('data', (buffer) => {
    log.info('[run][stopServerAndQuit][stop] stdout:', buffer.toString());
  });

  stopProcess.on('error', (buffer) => {
    log.error('[run][stopServerAndQuit][stop] error:', buffer.toString());
    app.exit();
  });

  stopProcess.on('exit', (code) => {
    log.error('[run][stopServerAndQuit][stop] exit width:', code);
    if (code === 1) {
      serverProcess.kill();
      app.exit();
    } else {
      serverProcess = null;
      app.quit();
    }
  });
}

app.on('ready', () => {
  log.info('[event][ready]');

  createWindow();
});

app.on('before-quit', (event) => {
  log.info('[event][before-quit]');

  if (serverProcess) {
    event.preventDefault();
    stopServerAndQuit();
  }
});

app.on('window-all-closed', () => {
  log.info('[event][window-all-closed]');

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  log.info('[event][activate]');

  if (mainWindow === null) {
    createWindow();
  }
});
