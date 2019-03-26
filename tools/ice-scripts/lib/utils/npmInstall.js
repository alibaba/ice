const { spawn, fork } = require('child_process');
const path = require('path');

const cliInstance = require('../utils/cliInstance');
const log = require('../utils/log');

module.exports = () => {
  if (cliInstance.get('skipInstall')) {
    return Promise.resolve();
  }
  return getNpm().then((npm) => {
    log.info('ice sdk npm bin:', npm);
    if (npm == 'tnpm' || npm == 'npm') {
      return runCmd(npm, ['install']);
    }
    return new Promise((resolve, reject) => {
      const ps = fork(npm, ['install']);

      ps.on('close', (code) => {
        if (code === 0) {
          resolve(code);
        } else {
          reject(code);
        }
      });
    });
  });
};

function getRunCmdEnv() {
  const env = {};
  Object.keys(process.env).forEach((key) => {
    env[key] = process.env[key];
  });
  // make sure `ice-scripts/node_modules/.bin` in the PATH env
  const nodeModulesBinDir = path.join(__dirname, '../../node_modules/.bin');
  env.PATH = env.PATH ? `${nodeModulesBinDir}:${env.PATH}` : nodeModulesBinDir;
  return env;
};

function runCmd(cmd, _args, callback) {
  const promise = new Promise((resolve, reject) => {
    const args = _args || [];
    const runner = spawn(cmd, args, {
      stdio: 'inherit',
      env: getRunCmdEnv(),
    });

    runner.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
  if (typeof fn === 'funciton') {
    promise
      .then((ok) => {
        callback.call(this, ok);
      })
      .catch((ok) => {
        callback.call(this, ok);
      });
  } else {
    return promise;
  }
};

function getNpm() {
  return new Promise((resolve) => {
    if (process.env.NPM_CLI) {
      resolve(process.env.NPM_CLI);
    } else {
      return runCmd('which', ['tnpm']).then(
        () => {
          resolve('tnpm');
        },
        () => {
          resolve('npm');
        }
      );
    }
  });
};
