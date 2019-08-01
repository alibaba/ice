const { getNpmTarball } = require('ice-npm-utils');
const extractTarball = require('./extractTarball');
const log = require('./log');

module.exports = ({ npmName, destDir }) => {
  return getNpmTarball(npmName, 'latest')
    .then((url) => {
      log.verbose('getNpmTarball', url);
      return extractTarball(url, destDir);
    });
};

