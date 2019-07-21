const { getNpmTarball } = require('ice-npm-utils');
const extractTarball = require('./extractTarball');

module.exports = ({ npmName, destDir }) => {
  return getNpmTarball(npmName, 'latest')
    .then((url) => {
      return extractTarball(url, destDir);
    });
};

