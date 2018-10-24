const path = require('path');
const fs = require('fs');
const request = require('request');
const zlib = require('zlib');
const tar = require('tar');
const home = require('user-home');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const npmUtils = require('./npm');

module.exports = (options = {}) => {
  const template = options.template;

  const templateTmpDirPath = path.join(home, '.ice-templates', template);

  let templateVersion = '';
  return getNpmVersion(template, options.version).then((npmVersion) => {
    templateVersion = npmVersion;

    deleteDir(templateTmpDirPath);

    return downloadAndFilterNpmFiles(
      template,
      templateVersion,
      templateTmpDirPath
    );
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
  return new Promise((resolve, reject) => {
    const taskComplete = {
      // foo: false
    };
    function end() {
      const isDone = Object.values(taskComplete).every((done) => done === true);

      if (isDone) {
        resolve();
      }
    }

    const npmTarball = `https://registry.npmjs.org/${npm}/-/${npm}-${version}.tgz`;
    taskComplete.entryPipe = false;
    request
      .get(npmTarball)
      .on('error', (err) => {
        reject(err);
      })
      .pipe(zlib.Unzip())
      .pipe(tar.Parse())
      .on('entry', (entry) => {
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
        taskComplete[destPath] = false;
        entry.pipe(fs.createWriteStream(destPath)).on('close', () => {
          taskComplete[destPath] = true;
          end();
        });
      })
      .on('end', () => {
        taskComplete.entryPipe = true;
        end();
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
  }
  return npmUtils.getLatestVersion(npm);
}
