const fse = require('fs-extra');
const getNpmTarball = require('../../lib/getNpmTarball');
const getNpmRegistry = require('../../lib/getNpmRegistry');
const extractTarball = require('../../lib/extractTarball');
const { TEMP_PATH } = require('../../lib/constants');

module.exports = async(template, materialConfig) => {
  await fse.emptyDir(TEMP_PATH);

  if (isLocalPath(template)) {
    await fse.copy(template, TEMP_PATH);
  } else {
    const registry = await getNpmRegistry(template, materialConfig, null, true);
    const tarballURL = await getNpmTarball(template, 'latest', registry);
    await extractTarball({
      tarballURL,
      destDir: TEMP_PATH,
    });
  }
  return TEMP_PATH;
};

function isLocalPath(filepath) {
  return /^[./]|(^[a-zA-Z]:)/.test(filepath);
}
