const path = require('path');
const fse = require('fs-extra');
const { getNpmTarball } = require('ice-npm-utils');
const extractTarball = require('../../lib/extractTarball');

module.exports = async({ template, cwd }) => {
  const TEMP_PATH = path.join(cwd, '.tmp');
  await fse.emptyDir(TEMP_PATH);

  if (isLocalPath(template)) {
    await fse.copy(template, TEMP_PATH);
  } else {
    const tarballURL = await getNpmTarball(template, 'latest');
    await extractTarball({
      tarballURL,
      destDir: TEMP_PATH,
      disableFormatDotFilename: true,
    });
  }
  return TEMP_PATH;
}

function isLocalPath(filepath) {
  return /^[./]|(^[a-zA-Z]:)/.test(filepath);
}
