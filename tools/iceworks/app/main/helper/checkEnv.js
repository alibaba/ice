const { getEnv } = require('../env');
const log = require('../logger');
const { exec } = require('child_process');

module.exports = function() {
  exec('node --version', { env: getEnv() }, (err, stdout, stderr) => {
    log.debug('node version:', stdout + stderr);
  });
  exec('npm --version', { env: getEnv() }, (err, stdout, stderr) => {
    log.debug('npm version:', stdout + stderr);
  });
};
