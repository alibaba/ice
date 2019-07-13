const { app, BrowserWindow } = require('electron');
const { fork } = require('child_process');
const path = require('path');
const StopCommand = require('egg-scripts').StopCommand;
const log = require('electron-log');
// const is = require('electron-is');

let mainWindow;
let serverProcess;

const sc = new StopCommand();
const startLoadingHTML = path.join(__dirname, '..', 'renderer', 'start_loading.html');
const errorLoadingHTML = path.join(__dirname, '..', 'renderer', 'error.html');

function createWindow() {
  mainWindow = new BrowserWindow();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.loadFile(startLoadingHTML);
  log.info('prepare to start the server');
  serverProcess = fork(require.resolve('../start_server.js'), [], {stdio:"pipe"});
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
    log.info(code);
    serverProcess = null;
    if (code === 0) {
      app.exit();
    }
    else{
      mainWindow.loadFile(errorLoadingHTML);
    }
  });

  serverProcess.on('error', (err) => {
    log.error('error...');
    log.error(err);
    mainWindow.load(errorLoadingHTML);
    console.log(err.message);
  })

  serverProcess.on('message',(msg) => {
    log.info(msg);
  })
}

app.on('ready', createWindow);

app.on('before-quit', (event) => {
  if (serverProcess) {
    event.preventDefault();
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
