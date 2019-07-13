const npmRunPath = require('npm-run-path');
const os = require('os');
const path = require('path');
const pathKey = require('path-key');
const is = require('electron-is');

const APP_BIN_PATH = is.dev()
  ? path.join(process.cwd(), `bin-${process.platform}`)
  : path.join(process.resourcesPath, 'bin');

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

  return env;
};