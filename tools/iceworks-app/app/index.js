const { app, BrowserWindow, Menu } = require('electron');
const address = require('address');
const execa = require('execa');
const path = require('path');
const detectPort = require('detect-port');
const is = require('electron-is');
const log = require('electron-log');
const semver = require('semver');
const shelljs = require('shelljs');
const { getNpmLatestSemverVersion, getNpmTarball, getAndExtractTarball } = require('ice-npm-utils');
const getEnv = require('./getEnv');
const getURL = require('./getURL');
const { register: autoUpdate, showWindow } = require('./autoUpdate');

let mainWindow;
let serverProcess;
let setPort = '7001';

const isProduction = is.production();
const ip = address.ip();
const env = getEnv();

const serverDirName = 'server';
const serverTempDirName = 'server_temp';
const serverDir = isProduction ? path.join(__dirname, '..', serverDirName) : path.join(__dirname, '..', '..', '..', 'packages', 'iceworks-server');
const serverTempDir = path.join(__dirname, '..', serverTempDirName);

// eslint-disable-next-line import/no-dynamic-require
const serverPackageJSON = require(path.join(serverDir, 'package.json'));

async function checkServerVersion() {
  const packageName = serverPackageJSON.name;
  const packageVersion = serverPackageJSON.version;
  if (isProduction) {
    try {
      const latestVersion = await getNpmLatestSemverVersion(packageName, packageVersion);
      if (semver.lt(packageVersion, latestVersion)) {
        return latestVersion;
      }
    } catch (error) {
      // ...
    }
  }
}

function windowLoadErrorPage() {
  if (mainWindow) {
    mainWindow.loadURL(getURL('error'));
  }
}

function windowLoadLoadingPage() {
  if (mainWindow) {
    mainWindow.loadURL(getURL('loading'));
  }
}

function windowLoadServer() {
  if (mainWindow) {
    mainWindow.loadURL(`http://${ip}:${setPort}/`);
  }
}

function sendLogToWindow(text) {
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.send('log', text);
  }
}

async function startServer() {
  if (!isProduction && mainWindow.webContents) {
    mainWindow.webContents.openDevTools({ mode: 'right' });
  }

  // Stop the last service started
  try {
    await execa('npm', ['stop'], { cwd: serverDir, env });
  } catch (error) {
    log.warn('[run][startServer][stop] got error: ', error);
  }

  setPort = await detectPort(setPort);

  return new Promise((resolve, reject) => {
    const args = isProduction ? ['start'] : ['run', 'dev'];
    serverProcess = execa('npm', args, {
      cwd: serverDir,
      env: {
        ...env,
        PORT: setPort,
      },
    });
  
    serverProcess.stdout.on('data', (buffer) => {
      const logInfo = buffer.toString();
      log.info('[run][startServer] stdout:', logInfo);

      sendLogToWindow(logInfo);

      if (logInfo.search('started on') > 0) {
        windowLoadServer();
        resolve();
      }
    });
  
    serverProcess.stderr.on('data', (buffer) => {
      const logInfo = buffer.toString();
      log.error('[run][startServer] stderr:', logInfo);

      sendLogToWindow(logInfo);
    });
  
    serverProcess.on('exit', (code) => {
      log.error('[run][startServer] exit width:', code);

      serverProcess = null;
      windowLoadErrorPage();
      reject();
    });
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
}

async function startServerAndLoadByWindow() {
  if (!serverProcess) {
    await startServer();
  } else {
    windowLoadServer();
  }
}

async function stopServerAndQuit() {
  log.info('[run][stopServerAndQuit]');

  // TODO The following call does not take effect
  windowLoadLoadingPage();

  let gotError;
  try {
    const { stdout, stderr } = await execa('npm', ['stop'], { cwd: serverDir, env });

    log.info('[run][stopServerAndQuit][stop] stdout:', stdout);
    log.info('[run][stopServerAndQuit][stop] stderr:', stderr);
  } catch (error) {
    gotError = error;
    log.error('[run][stopServerAndQuit][stop] got error, exit app');
  
    serverProcess.kill();
    app.exit();
  }

  if (!gotError) {
    log.error('[run][stopServerAndQuit][stop] success, quit app');

    serverProcess = null;
    app.quit();
  }
}

async function upgradeServer() {
  log.info('[run][upgradeServer] start');
  log.info('[run][upgradeServer] serverTempDir:', serverTempDir);

  let success = false;
  try {
    sendLogToWindow('> ================== trying to upgrade server code ==================\n');
    sendLogToWindow('> [upgrade server] Get NPM tarball url...');
    sendLogToWindow('> [upgrade server] ......');
    const tarball = await getNpmTarball('iceworks-server');

    sendLogToWindow('> [upgrade server] Get and extract tarball...');
    sendLogToWindow('> [upgrade server] ......');
    await getAndExtractTarball(serverTempDir, tarball);

    sendLogToWindow('> [upgrade server] NPM install...');
    sendLogToWindow('> [upgrade server] ......');
    await execa('npm', ['install'], {
      stdio: 'inherit',
      cwd: serverTempDir,
      env: process.env,
    });

    success = true;
  } catch (error) {
    log.error('[run][upgradeServer] got error:', error);
    sendLogToWindow('> [upgrade server] Upgrade failure');
  }

  if (success) {
    log.info('[run][upgradeServer] done');
    sendLogToWindow('> [upgrade server] Upgrade success');

    shelljs.rm('-rf', [serverDir]);
    shelljs.mv(serverTempDir, serverDir);
  }
}

function setMenu() {
  const template = [];
  template.unshift({
    label: 'iceworks',
    submenu: [
      {
        label: '检查更新...',
        click() {
          showWindow();
        },
      },
    ],
  });
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.on('ready', () => {
  log.info('[event][ready]');

  createWindow();

  windowLoadLoadingPage();

  checkServerVersion()
    .then((hasNewServer) => {
      if (hasNewServer) {
        return upgradeServer();
      }
    })
    .then(startServerAndLoadByWindow)
    .then(() => {
      if (isProduction) {
        return autoUpdate();
      }
    }).then(setMenu);
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
    startServerAndLoadByWindow();
  }
});
