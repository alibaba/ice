const path = require('path');
const pathKey = require('path-key');
const log = require('electron-log');
const shellPath = require('shell-path');
const npmRunPath = require('npm-run-path');

module.exports = function () {
  const PATH = pathKey();
  const npmRunPathValue = npmRunPath();
  const shellPathValue = shellPath.sync();

  log.info('npmRunPath():', npmRunPathValue);
  log.info('shellPath():', shellPathValue);
  log.info('process.env.PATH:', process.env[PATH]);

  const env = process.env;
  const envPath = shellPathValue.split(path.delimiter);

  // for fallback
  envPath.push(path.join(process.resourcesPath, 'bin'));

  env[PATH] = envPath.join(path.delimiter);
  
  log.info('env.PATH:', env[PATH]);

  return env;
};
