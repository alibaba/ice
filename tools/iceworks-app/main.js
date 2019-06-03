const { app, BrowserWindow } = require('electron');
const is = require('electron-is');
const address = require('address');
const execa = require('execa');
const path = require('path');
const detectPort = require('detect-port');

const isProduction = is.production();
const ip = address.ip();
const serverDir = path.join(__dirname, 'server');

let mainWindow;
let serverProcess;
let setPort = '7001';

function createWindow() {
  mainWindow = new BrowserWindow();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.loadFile('start_loading.html');

  const url = true ? `http://${ip}:${setPort}/` : `http://${ip}:4444/`;

  if (!serverProcess) {
    (async () => {
      setPort = await detectPort(setPort);
      serverProcess = execa('npm', ['start'], {
        cwd: serverDir,
        env: {
          PORT: setPort,
        },
      });

      serverProcess.stdout.on('data', (buffer) => {
        if (!isProduction) {
          console.log(buffer.toString());
        }
      });

      serverProcess.on('error', (buffer) => {
        if (!isProduction) {
          console.error(buffer.toString());
        }
      });

      serverProcess.on('exit', (code) => {
        if (code === 0) {
          mainWindow.loadURL(url);
        } else {
          serverProcess = null;
          mainWindow.loadFile('error.html');
        }
      });
    })();
  } else {
    mainWindow.loadURL(url);
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', (event) => {
  if (serverProcess) {
    event.preventDefault();

    mainWindow.loadFile('stop_loading.html');

    const stopProcess = execa('npm', ['stop'], {
      cwd: serverDir,
    });

    stopProcess.stdout.on('data', (buffer) => {
      if (!isProduction) {
        console.log(buffer.toString());
      }
    });

    stopProcess.on('error', (buffer) => {
      if (!isProduction) {
        console.error(buffer.toString());
      }
    });

    stopProcess.on('exit', (code) => {
      if (code === 0) {
        serverProcess.kill();
        serverProcess = null;
        app.quit();
      }
    });
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
