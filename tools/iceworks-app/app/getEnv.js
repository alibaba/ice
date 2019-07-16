const path = require('path');
const pathKey = require('path-key');
const is = require('electron-is');
const log = require('electron-log');

module.exports = function () {
  const env =  process.env;
  const PATH = pathKey();

  const envPath = env[PATH].split(path.delimiter);
  const macOSUserLocalBin = '/usr/local/bin';

  // for fallback
  if (is.osx() && envPath.indexOf(macOSUserLocalBin) === -1) {
    envPath.push(macOSUserLocalBin);
  }
  envPath.push(path.join(process.resourcesPath, 'bin'));

  env[PATH] = envPath.join(path.delimiter);
  
  log.info('env[PATH]:', env[PATH]);

  return env;
};
