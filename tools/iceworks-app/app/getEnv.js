const path = require('path');
const pathKey = require('path-key');
const is = require('electron-is');
const log = require('electron-log');

module.exports = function () {
  const env =  process.env;
  const PATH = pathKey();

  const pathEnv = [
    env[PATH],
  ];

  // for fallback
  if (is.osx()) {
    pathEnv.push('/usr/local/bin');
  }
  pathEnv.push(path.join(process.resourcesPath, 'bin'));

  env[PATH] = pathEnv.join(path.delimiter);
  
  log.info('env[PATH]:', env[PATH]);

  return env;
};
