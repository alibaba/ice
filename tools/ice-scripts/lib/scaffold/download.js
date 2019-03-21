const path = require('path');
const fs = require('fs');
const axios = require('axios');
const zlib = require('zlib');
const fse = require('fs-extra')
const tar = require('tar');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const ora = require('ora');
const npmUtils = require('./npm');
const log = require('../utils/log');

module.exports = ({ npmName, projectDir }) => {

  return npmUtils.getLatestVersion(npmName).then((npmVersion) => {
    return downloadAndFilterNpmFiles(
      npmName,
      npmVersion,
      projectDir
    );
  });
};

/**
 * download and filter npm files
 *
 * @param {Object} options npm, version, destDir
 */
function downloadAndFilterNpmFiles(npm, version, destDir) {
  const npmTarball = `${npmUtils.getRegistry(npm)}/${npm}/-/${npm}-${version}.tgz`;
  log.verbose('downloadAndFilterNpmFiles', npmTarball, destDir);

  const downloadSpinner = ora('dowload scaffold npm……');
  downloadSpinner.start();
  return axios.get(npmTarball, {
    responseType:'stream'
  }).then((response) => {

    const allWriteStream = [];
    return new Promise((resolve, reject) => {
      response.data
        .pipe(zlib.Unzip())
        .pipe(tar.Parse())
        .on('entry', (entry) => {
          const realPath = entry.path.replace('package/', '');
          // _gitignore -> .gitignore
          const filename = path.basename(realPath).replace(/^_/, '.');
          const destPath = path.join(destDir, path.dirname(realPath), filename);

          fse.ensureFileSync(destPath);

          const writeStream = new Promise((streamResolve) => {
            entry
              .pipe(fs.createWriteStream(destPath))
              .on('finish', () => streamResolve());
          });
          allWriteStream.push(writeStream);
        })
        .on('end', () => {
          Promise
            .all(allWriteStream)
            .then(() => {
              downloadSpinner.stop()
              resolve();
            })
            .catch((err) => {
              downloadSpinner.stop()
              reject(err);
            });
        })
        .on('error', (err) => {
          downloadSpinner.stop()
          reject(err);
        });
    });

  });
}
