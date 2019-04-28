const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const tmpDirectory = path.join(__dirname, 'tmp');
rimraf.sync(tmpDirectory);
mkdirp.sync(tmpDirectory);

module.exports = async () => {
  rimraf.sync(tmpDirectory);
};
