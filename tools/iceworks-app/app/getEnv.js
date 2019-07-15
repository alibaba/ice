const npmRunPath = require('npm-run-path');
const path = require('path');
const pathKey = require('path-key');
const is = require('electron-is');
const log = require('electron-log');

const APP_BIN_PATH = path.join(process.resourcesPath, 'bin');

module.exports = function () {
  const PATH = pathKey();
  const env = Object.assign({}, npmRunPath.env());

  const pathEnv = [
    env[PATH],
    APP_BIN_PATH,
  ];

  if (is.osx()) {
    pathEnv.push('/usr/local/bin');
  }

  env[PATH] = pathEnv.join(path.delimiter);

  log.info('env[PATH]:', env[PATH]);

  return env;
};
