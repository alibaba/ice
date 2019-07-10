const { app, BrowserWindow } = require('electron');
const address = require('address');
const { spawn } = require('child_process');
const path = require('path');
const StopCommand = require('egg-scripts').StopCommand;
const detectPort = require('detect-port');
// const is = require('electron-is');

let mainWindow;
let serverProcess;
const setPort = '7001';

const isProduction = true; // is.production();
const ip = address.ip();
const sc = new StopCommand();
const serverDir = path.join(__dirname, '..', 'server');
const startLoadingHTML = path.join(__dirname, '..', 'renderer', 'start_loading.html');
const stopLoadingHTML = path.join(__dirname, '..', 'renderer', 'stop_loading.html');
const errorLoadingHTML = path.join(__dirname, '..', 'renderer', 'error.html');

function getServerUrl() {
  return isProduction ? `http://${ip}:${setPort}/` : `http://${ip}:4444/`;
}

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
    if (code == 0) {
      serverProcess = null;
      app.exit();
      // mainWindow.loadFile(errorLoadingHTML);
    }
  });
}

app.on('ready', createWindow);

app.on('before-quit', (event) => {
  if (serverProcess) {
    // mainWindow.loadFile(stopLoadingHTML);    
    sc.helper.kill([String(serverProcess.pid)]);
  }
});
app.on('quit', (event)=>{
  console.log('quit');
  console.log(event);
})
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
