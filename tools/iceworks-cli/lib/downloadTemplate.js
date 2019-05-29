
const getTarball = require('./getTarball');
const extractTarball = require('./extractTarball');

module.exports = ({ template, cwd }) => {
  return getTarball(template)
    .then((url) => {
      return extractTarball(url, cwd);
    });
};

