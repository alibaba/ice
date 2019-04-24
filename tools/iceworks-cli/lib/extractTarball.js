const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const request = require('request');
const progress = require('request-progress');
const zlib = require('zlib');
const tar = require('tar');

/**
 * Download tarbar content to the specified directory
 * @param {string} tarballURL tarball url
 * @param {string} destDir target directory
 */
module.exports = function extractTarball(
  tarballURL,
  destDir,
  progressFunc = () => {}
) {
  console.log({ destDir });
  return new Promise((resolve, reject) => {
    const allFiles = [];
    const allWriteStream = [];
    const directoryCollector = [];

    progress(
      request({
        url: tarballURL,
        timeout: 10000,
      })
    )
      .on('progress', (state) => {
        progressFunc(state);
      })
      .on('error', (error = {}) => {
        error.name = 'download-tarball-error';
        error.data = {
          url: tarballURL,
        };
        console.error(error);
        reject(error);
      })
      .pipe(zlib.Unzip())
      .on('error', (error) => {
        reject(error);
      })
      .pipe(tar.Parse())
      .on('entry', (entry) => {
        const realPath = entry.path.replace(/^package\//, '');

        const destPath = path.join(destDir, realPath);

        const needCreateDir = path.dirname(destPath);
        if (!directoryCollector.includes(needCreateDir)) {
          directoryCollector.push(needCreateDir);
          mkdirp.sync(path.dirname(destPath));
        }

        allFiles.push(destPath);
        const writeStream = new Promise((streamResolve) => {
          entry
            .pipe(fs.createWriteStream(destPath))
            .on('finish', () => streamResolve());
        });
        allWriteStream.push(writeStream);
      })
      .on('end', () => {
        console.log('end', tarballURL);
        progressFunc({
          percent: 1,
        });
        Promise.all(allWriteStream)
          .then(() => resolve(allFiles))
          .catch((error) => {
            reject(error);
          });
      });
  });
};
