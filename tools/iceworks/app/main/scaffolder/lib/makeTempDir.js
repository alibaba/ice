const uuid = require('uuid').v4();
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');
const logger = require('../../logger')

const ICE_TEMPDIR = path.join(os.tmpdir(), uuid);
mkdirp.sync(ICE_TEMPDIR);

logger.debug(ICE_TEMPDIR);

process.on('exit', () => {
  // clean tmp
  rimraf.sync(ICE_TEMPDIR);
});

module.exports = ICE_TEMPDIR;
