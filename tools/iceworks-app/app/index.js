const { app, BrowserWindow } = require('electron');
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

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1280, height: 800 });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (!serverProcess) {
    (async () => {
      mainWindow.loadFile(loadingHTML);

      if (!isProduction) {
        mainWindow.webContents.openDevTools({ mode: 'right' });
      }

      try {
        await execa('npm', ['stop'], { cwd: serverDir, env });
      } catch (error) {
        log.warn('stop got error:', error);
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
        log.info('start stdout:', logInfo);

        mainWindow.webContents.send('log', logInfo);

        if (logInfo.search('midway started on') > 0) {
          mainWindow.loadURL(getServerUrl());
        }
      });

      serverProcess.on('error', (buffer) => {
        log.error('start got error:', buffer.toString());
        mainWindow.loadFile(errorHTML);
      });

      serverProcess.stderr.on('data', (buffer) => {
        log.error('start stderr:', buffer.toString());
      });

      serverProcess.on('exit', (code) => {
        log.error('start process exit width:', code);

        if (code === 0) {
          mainWindow.loadURL(getServerUrl());
        } else {
          serverProcess = null;
          mainWindow.loadFile(errorHTML);
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

    // TODO The following call does not take effect
    if (mainWindow) {
      mainWindow.loadFile(loadingHTML);
    }

    const stopProcess = execa('npm', ['stop'], { cwd: serverDir, env });

    stopProcess.stdout.on('data', (buffer) => {
      log.info('stop stdout:', buffer.toString());
    });

    stopProcess.on('error', (buffer) => {
      log.error('stop got error:', buffer.toString());
      app.exit();
    });

    stopProcess.on('exit', (code) => {
      log.error('stop process exit width:', code);
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
