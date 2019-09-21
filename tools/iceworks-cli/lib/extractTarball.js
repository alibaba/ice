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
module.exports = function extractTarball({
  tarballURL,
  destDir,
  progressFunc = () => {},
  disableFormatDotFilename = false,
}) {
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
        reject(error);
      })
      .pipe(zlib.Unzip())
      .on('error', (error) => {
        reject(error);
      })
      .pipe(tar.Parse())
      .on('entry', (entry) => {
        const realPath = entry.path.replace(/^package\//, '');

        let filename = path.basename(realPath);
        filename = formatFilename(filename, disableFormatDotFilename);

        const destPath = path.join(destDir, path.dirname(realPath), filename);

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


/**
 * 下载 npm 后的文件名处理
 *
 * 1. _package.json -> package.json（仅匹配 package.json）
 * 2. _eslintrc -> .eslintrc（通过 disableFormatDotFilename 开关，按白名单匹配）
 *
 * @param {String} filename
 * @param {Boolean} disableFormatDotFilename
 */
function formatFilename(filename, disableFormatDotFilename) {
  if (disableFormatDotFilename) {
    return filename;
  }

  if (/^_/.test(filename)) {
    // _package.json -> package.json
    if (filename === '_package.json') {
      filename = 'package.json';
    } else {
      // 只转换特定文件，防止误伤
      const dotFilenames = [
        '_eslintrc.js',
        '_eslintrc',
        '_eslintignore',
        '_gitignore',
        '_stylelintrc.js',
        '_stylelintrc',
        '_stylelintignore',
        '_editorconfig',
      ];
      if (dotFilenames.indexOf(filename) !== -1) {
        // _eslintrc.js -> .eslintrc.js
        filename = filename.replace(/^_/, '.');
      }
    }
  }

  return filename;
}
