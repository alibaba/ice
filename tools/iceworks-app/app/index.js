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

let mainWindow;
let serverProcess;
let setPort = '7001';
const serverDirName = 'server';
const serverTempDirName = 'server_temp';

const isProduction = is.production();
const ip = address.ip();
const env = getEnv();
const serverDir = isProduction ? path.join(__dirname, '..', serverDirName) : path.join(__dirname, '..', '..', '..', 'packages', 'iceworks-server');
const serferTempDir = path.join(__dirname, '..', serverTempDirName);
const loadingHTML = path.join(__dirname, 'loading.html');
const errorHTML = path.join(__dirname, 'error.html');

async function checkVersion(packageName, packageVersion) {
  try {
    const latestVersion = await getNpmLatestSemverVersion(packageName, packageVersion);
    if (semver.lt(packageVersion, latestVersion)) {
      return latestVersion;
    }
  } catch (error) {
    // ...
  }
};

// eslint-disable-next-line import/no-dynamic-require
const serverPackageJSON = require(path.join(serverDir, 'package.json'));

async function checkServerVersion() {
  const packageName = serverPackageJSON.name;
  const packageVersion = serverPackageJSON.version;
  return isProduction && await checkVersion(packageName, packageVersion);
}

function getServerUrl() {
  return `http://${ip}:${setPort}/`;
}

async function startServer() {
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
}

function windowLoadServer() {
  if (!serverProcess) {
    log.info('[run][loadServer][start-server]');
    startServer();
  } else {
    log.info('[run][loadServer][load-server]');
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

async function downloadServer() {
  log.info('[run][downloadServer] start');
  log.info('[run][downloadServer] serferTempDir:', serferTempDir);

  let success = false;
  try {
    const tarball = await getNpmTarball('iceworks-server');
    await getAndExtractTarball(serferTempDir, tarball);
    await execa('npm', ['install'], {
      stdio: 'inherit',
      cwd: serferTempDir,
      env: process.env,
    });
    success = true;
  } catch (error) {
    log.error('[run][downloadServer] got error:', error);
  }

  if (success) {
    log.info('[run][downloadServer] done');
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
    .then(windowLoadServer);
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
    windowLoadServer();
  }
});
