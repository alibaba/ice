'use strict';

const path = require('path');
const fs = require('fs');
const request = require('request');
const zlib = require('zlib');
const tar = require('tar');
const home = require('user-home');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const npmUtils = require('./npm');
const os = require('os');

module.exports = (options = {}) => {
  return new Promise((resolve, reject) => {
    const template = options.template;

    const templateTmpDirPath = path.join(home, '.ice-templates', template);

    let templateVersion = '';

    getNpmVersion(template, options.version)
      .catch(function(err) {
        reject(err);
      })
      .then(function(npmVersion) {
        templateVersion = npmVersion;

        deleteDir(templateTmpDirPath);

        return downloadAndFilterNpmFiles(
          template,
          templateVersion,
          templateTmpDirPath
        );
      })
      .catch(reject)
      .then(resolve);
  });
};

/**
 * delete dir
 * @param {String} destDir
 */
function deleteDir(destDir) {
  rimraf.sync(destDir);
}

/**
 * download and filter npm files
 *
 * @param {Object} options npm, version, destDir
 */
function downloadAndFilterNpmFiles(npm, version, destDir) {
  return new Promise(function(resolve, reject) {
    const npmTarball = `https://registry.npmjs.org/${npm}/-/${npm}-${version}.tgz`;
    request
      .get(npmTarball)
      .on('error', function(err) {
        reject(err);
      })
      .pipe(zlib.Unzip())
      .pipe(tar.Parse())
      .on('entry', function(entry) {
        const templatePathReg = new RegExp(`(package\/template\/)`);

        let realPath;
        let destPath;

        if (templatePathReg.test(entry.path)) {
          realPath = entry.path.replace(templatePathReg, '');
          destPath = path.join(destDir, 'template', realPath);
        } else {
          realPath = entry.path.replace('package/', '');
          destPath = path.join(destDir, realPath);
        }

        mkdirp.sync(path.dirname(destPath));
        entry.pipe(fs.createWriteStream(destPath));
      })
      .on('end', function() {
        resolve();
      });
  });
}

/**
 * get template version
 *
 * @param {String} npm
 * @param {String} version
 */
function getNpmVersion(npm, version) {
  if (version) {
    return npmUtils.getNpmLatestSemverVersion(npm, version);
  } else {
    return npmUtils.getLatestVersion(npm);
  }
}
