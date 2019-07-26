const { app, BrowserWindow } = require('electron');
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
const autoUpdate = require('./autoUpdate');

let mainWindow;
let serverProcess;
let setPort = '7001';

const isProduction = is.production();
const ip = address.ip();
const env = getEnv();

const serverDirName = 'server';
const serverTempDirName = 'server_temp';
const serverDir = isProduction ? path.join(__dirname, '..', serverDirName) : path.join(__dirname, '..', '..', '..', 'packages', 'iceworks-server');
const serferTempDir = path.join(__dirname, '..', serverTempDirName);

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

function windowLoadError() {
  if (mainWindow) {
    mainWindow.loadURL(getURL('error'));
  }
}

function windowLoadLoading() {
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
    mainWindow.webContents.send('logs', text);
  }
}

async function startServer() {
  windowLoadLoading();

  if (!isProduction && mainWindow.webContents) {
    mainWindow.webContents.openDevTools({ mode: 'right' });
  }

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
      log.error('[run][startServer] stderr:', buffer.toString());
    });
  
  
    serverProcess.on('exit', (code) => {
      log.error('[run][startServer] exit width:', code);
      serverProcess = null;
      windowLoadError();
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
  windowLoadLoading();

  let gotError;
  try {
    const { stdout, stderr } = await execa('npm', ['stop'], { cwd: serverDir, env });
    log.info('[run][stopServerAndQuit][stop] stdout:', stdout);
    log.info('[run][stopServerAndQuit][stop] stderr:', stderr);
  } catch (error) {
    log.error('[run][stopServerAndQuit][stop] got error, exit app');
    gotError = error;
    serverProcess.kill();
    app.exit();
  }

  if (!gotError) {
    log.error('[run][stopServerAndQuit][stop] success, quit app');
    serverProcess = null;
    app.quit();
  }
}

async function downloadServer() {
  log.info('[run][downloadServer] start');
  log.info('[run][downloadServer] serferTempDir:', serferTempDir);
  windowLoadLoading();

  let success = false;
  try {
    sendLogToWindow('> ================== trying to upgrade server code ==================\n');
    sendLogToWindow('> [upgrade server] Get NPM tarball url...');
    sendLogToWindow('> [upgrade server] ......');
    const tarball = await getNpmTarball('iceworks-server');

    sendLogToWindow('> [upgrade server] Get and extract tarball...');
    sendLogToWindow('> [upgrade server] ......');
    await getAndExtractTarball(serferTempDir, tarball);

    sendLogToWindow('> [upgrade server] NPM install...');
    sendLogToWindow('> [upgrade server] ......');
    await execa('npm', ['install'], {
      stdio: 'inherit',
      cwd: serferTempDir,
      env: process.env,
    });
    success = true;
  } catch (error) {
    log.error('[run][downloadServer] got error:', error);
    sendLogToWindow('> [upgrade server] Upgrade failure');
  }

  if (success) {
    log.info('[run][downloadServer] done');
    sendLogToWindow('> [upgrade server] Upgrade success');

    shelljs.rm('-rf', [serverDir]);
    shelljs.mv(serferTempDir, serverDir);
  }
}

app.on('ready', () => {
  log.info('[event][ready]');

  createWindow();

  checkServerVersion()
    .then((hasNewVersion) => {
      if (hasNewVersion) {
        return downloadServer();
      }
    })
    .then(startServerAndLoadByWindow)
    .then(() => {
      if (isProduction) {
        return autoUpdate();
      }
    });
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
