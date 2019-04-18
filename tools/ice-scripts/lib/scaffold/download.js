const path = require('path');
const fs = require('fs');
const axios = require('axios');
const zlib = require('zlib');
const fse = require('fs-extra');
const tar = require('tar');
const ora = require('ora');
const npmUtils = require('ice-npm-utils');
const log = require('../utils/log');

module.exports = ({ npmName, projectDir, formatFile }) => {
  return npmUtils.getLatestVersion(npmName).then((npmVersion) => {
    return downloadAndFilterNpmFiles(
      npmName,
      npmVersion,
      projectDir,
      formatFile
    );
  });
};

/**
 * download and filter npm files
 *
 * @param {Object} options npm, version, destDir
 */
function downloadAndFilterNpmFiles(npm, version, destDir, formatFile) {
  const npmTarball = `${npmUtils.getNpmRegistry(npm)}/${npm}/-/${npm}-${version}.tgz`;
  log.verbose('downloadAndFilterNpmFiles', npmTarball, destDir);

  const downloadSpinner = ora('dowload scaffold npm……');
  downloadSpinner.start();
  return axios.get(npmTarball, {
    responseType: 'stream',
  }).then((response) => {
    const allWriteStream = [];
    return new Promise((resolve, reject) => {
      response.data
        .pipe(zlib.Unzip())
        .pipe(tar.Parse())
        .on('entry', (entry) => {
          const realPath = entry.path.replace('package/', '');
          let filename = path.basename(realPath);

          // _gitignore -> .gitignore
          // 特殊逻辑：_package.json -> package.json
          if (filename === '_package.json') {
            filename = filename.replace(/^_/, '');
          } else {
            filename = filename.replace(/^_/, '.');
          }

          const destPath = path.join(destDir, path.dirname(realPath), filename);

          fse.ensureFileSync(destPath);

          const writeStream = new Promise((streamResolve) => {
            entry
              .pipe(fs.createWriteStream(destPath))
              .on('finish', () => {
                formatFile = formatFile || Promise.resolve;
                return formatFile(destPath).then(streamResolve);
              });
          });
          allWriteStream.push(writeStream);
        })
        .on('end', () => {
          Promise
            .all(allWriteStream)
            .then(() => {
              downloadSpinner.succeed('download npm succeed!');
              resolve();
            })
            .catch((err) => {
              downloadSpinner.fail('download npm fail!');
              reject(err);
            });
        })
        .on('error', (err) => {
          downloadSpinner.fail('download npm fail!');
          reject(err);
        });
    });
  });
}
