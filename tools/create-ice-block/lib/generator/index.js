'use strict';

const path = require('path');
const fs = require('fs');
const request = require('request');
const zlib = require('zlib');
const tar = require('tar');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const debug = require('debug')('ice:generator:index');
const render = require('./render');
const npmUtils = require('./npm');
const os = require('os');

module.exports = function(options) {
  debug('options', options);

  return new Promise((resolve, reject) => {
    const type = options.type;

    const template = options.template;

    const destDir = options.destDir;

    const abcPath = options.abcPath || destDir;

    const templateOptions = options.templateOptions;
    let templateVersion = '';

    const templateTmpDirPath = path.join(
      os.tmpdir(),
      'ice-generator',
      template,
      type
    );

    getNpmVersion(template, options.version)
      .then(function(npmVersion) {
        templateVersion = npmVersion;

        deleteDir(templateTmpDirPath);

        return downloadAndFilterNpmFiles(
          template,
          templateVersion,
          templateTmpDirPath,
          type
        );
      })
      .then(function() {
        return render.renderDir(
          templateTmpDirPath,
          destDir,
          templateOptions,
          abcPath
        );
      })
      .then(resolve)
      .catch(reject);
  });
};

module.exports.renderDir = render.renderDir;

/**
 * 删除目录下所有内容
 * @param {String} destDir
 */
function deleteDir(destDir) {
  rimraf.sync(destDir);
}

/**
 * 下载 npm 并根据不同类型过滤文件
 *
 * @param {Object} options npm, version, destDir, type
 */
function downloadAndFilterNpmFiles(npm, version, destDir, type) {
  return new Promise(function(resolve, reject) {
    const npmTarball = `http://registry.npmjs.org/${npm}/-/${npm}-${version}.tgz`;
    debug('npmTarball', npmTarball);

    request
      .get(npmTarball)
      .on('error', function(err) {
        reject(err);
      })
      .pipe(zlib.Unzip()) // eslint-disable-line
      .pipe(tar.Parse()) // eslint-disable-line
      .on('entry', function(entry) {
        // entry.path: package/template/src/index.js
        const templatePathReg = new RegExp(`(package\/template\/${type}\/)`);
        // tnpm 会自动生成 .npmignore, 这里需要过滤掉
        const filterFileReg = /\.npmignore/;

        if (
          templatePathReg.test(entry.path) &&
          !filterFileReg.test(entry.path)
        ) {
          let realPath = entry.path.replace(templatePathReg, '');

          // 写入模板文件
          const destPath = path.join(destDir, realPath);

          mkdirp.sync(path.dirname(destPath));
          entry.pipe(fs.createWriteStream(destPath));
        }
      })
      .on('end', function() {
        resolve();
      });
  });
}

/**
 * 获取模板的合适版本号
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
