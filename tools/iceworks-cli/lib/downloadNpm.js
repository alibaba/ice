
const getTarball = require('./getTarball');
const extractTarball = require('./extractTarball');

module.exports = ({ npmName, destDir }) => {
  return getTarball(npmName)
    .then((url) => {
      return extractTarball(url, destDir);
    });
};

