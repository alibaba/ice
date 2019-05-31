const { app, BrowserWindow } = require('electron');
// const is = require('electron-is');
const address = require('address');
const execa = require('execa');
const path = require('path');
const detectPort = require('detect-port');

const ip = address.ip();
const serverDir = path.join(__dirname, 'server');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.loadFile('loading.html');

  (async () => {
    let setPort = '7001';
    setPort = await detectPort(setPort);
    try {
      const { stdout } = await execa('npm', ['start'], {
        cwd: serverDir,
        env: {
          PORT: setPort,
        },
      });
      console.log(stdout);
      const url = true ? `http://${ip}:${setPort}/` : `http://${ip}:4444/`;
      mainWindow.loadURL(url);
    } catch (error) {
      mainWindow.loadFile('error.html');
    }
  })();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
