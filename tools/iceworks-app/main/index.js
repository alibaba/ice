const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const StopCommand = require('egg-scripts').StopCommand;
// const is = require('electron-is');

let mainWindow;
let serverProcess;

const sc = new StopCommand();
const startLoadingHTML = path.join(__dirname, '..', 'renderer', 'start_loading.html');

function createWindow() {
  mainWindow = new BrowserWindow();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.loadFile(startLoadingHTML);

  serverProcess = spawn('node', ['start_server.js']);
  serverProcess.stdout.on('data', (buffer) => {
    const logInfo = buffer.toString();
    console.log(logInfo);
    if (logInfo.search('midway started on') > 0) {
      mainWindow.loadURL('http://localhost:7001/');
    }
  });

  serverProcess.stderr.on('data', (buffer) => {
    console.error(buffer.toString());
    // mainWindow.loadFile(errorLoadingHTML);
  });

  serverProcess.on('close', (code) => {
    if (code === 0) {
      serverProcess = null;
      app.exit();
      // mainWindow.loadFile(errorLoadingHTML);
    }
  });
}

app.on('ready', createWindow);

app.on('before-quit', () => {
  if (serverProcess) {
    // mainWindow.loadFile(stopLoadingHTML);
    sc.helper.kill([String(serverProcess.pid)]);
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
