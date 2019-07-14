const { app, BrowserWindow } = require('electron');
const address = require('address');
const execa = require('execa');
const path = require('path');
const detectPort = require('detect-port');
const is = require('electron-is');
const log = require('electron-log');

let mainWindow;
let serverProcess;
let setPort = '7001';

const isProduction = is.production();
const ip = address.ip();
const serverDir = isProduction ? path.join(__dirname, 'server') : path.join(__dirname, '...', 'build', 'server');
const startLoadingHTML = path.join(__dirname, 'start_loading.html');
const stopLoadingHTML = path.join(__dirname, 'stop_loading.html');
const errorLoadingHTML = path.join(__dirname, 'error.html');

function getServerUrl() {
  return isProduction ? `http://${ip}:${setPort}/` : `http://${ip}:4444/`;
}

function createWindow() {
  mainWindow = new BrowserWindow();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (isProduction && !serverProcess) {
    (async () => {
      mainWindow.loadFile(startLoadingHTML);

      try {
        await execa('npm', ['stop'], { cwd: serverDir });
      } catch (error) {
        log.warn(error);
      }

      setPort = await detectPort(setPort);
      serverProcess = execa('npm', ['start'], {
        cwd: serverDir,
        env: {
          PORT: setPort,
        },
      });

      serverProcess.stdout.on('data', (buffer) => {
        const logInfo = buffer.toString();
        if (logInfo.search('midway started on') > 0) {
          mainWindow.loadURL(getServerUrl());
        }
      });

      serverProcess.on('error', (buffer) => {
        log.error(buffer.toString());
        mainWindow.loadFile(errorLoadingHTML);
      });

      serverProcess.on('exit', (code) => {
        if (code === 0) {
          mainWindow.loadURL(getServerUrl());
        } else {
          serverProcess = null;
          mainWindow.loadFile(errorLoadingHTML);
        }
      });
    })();
  } else {
    mainWindow.loadURL(getServerUrl());
  }
}

app.on('ready', createWindow);

app.on('before-quit', (event) => {
  if (serverProcess) {
    event.preventDefault();

    mainWindow.loadFile(stopLoadingHTML);

    const stopProcess = execa('npm', ['stop'], { cwd: serverDir });

    stopProcess.stdout.on('data', (buffer) => {
      log.log(buffer.toString());
    });

    stopProcess.on('error', (buffer) => {
      log.error(buffer.toString());
      app.quit();
    });

    stopProcess.on('exit', (code) => {
      if (code === 0) {
        serverProcess.kill();
        serverProcess = null;
        app.exit();
      } else {
        app.quit();
      }
    });
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
