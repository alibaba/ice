const path = require('path');
const fs = require('fs');
const request = require('request');
const zlib = require('zlib');
const tar = require('tar');
const ora = require('ora');
const existsSync = require('fs').existsSync;
const home = require('user-home');
const rimraf = require('rimraf');
const debug = require('debug')('ice:add:general');
const mkdirp = require('mkdirp');

const logger = require('./logger');
const getPkgJSON = require('./pkg-json').getPkgJSON;
const getNpmRegistry = require('./npm').getNpmRegistry;
const {
  getNpmLatestSemverVersion,
  getLatestVersion,
} = require('ice-npm-utils');

const Parser = tar.Parse;

/**
 * local path validator
 * @param {string} aPath
 */
function isLocalPath(aPath) {
  return /^[./]|(^[a-zA-Z]:)/.test(aPath);
}

/**
 * get material template path
 * download it if template is a npm package
 *
 * @param {string} type material type
 * @param {string} template material template name
 */
async function getTemplate(cwd, type, template) {
  // from local path
  if (template && isLocalPath(template)) {
    const templatePath = path.join(template, type === 'material' ? 'template' : `template/${type}`);
    if (existsSync(templatePath)) {
      const pkgJson = getPkgJSON(template);
      return {
        path: templatePath,
        config: pkgJson.materialConfig || {},
      };
    }
    logger.fatal(`template is not found in ${templatePath}`);
  }

  // form npm package
  const tmp = await downloadTemplate(cwd, template);
  return {
    path: path.join(tmp, type === 'material' ? 'template' : `template/${type}`),
    config: getPkgJSON(tmp).materialConfig || {},
  };
}

async function downloadTemplate(_cwd, template, version, tempDir) {
  tempDir = tempDir || path.join(home, '.ice-templates', template);

  const spinner = ora('downloading template...').start();
  debug('downloadTemplate', template);
  console.log('download', template);

  try {
    deleteDir(tempDir);
    const npmVersion = await getNpmVersion(template, version);
    console.log('version', npmVersion);
    await downloadAndFilterNpmFiles(
      template,
      npmVersion,
      tempDir
    );
    spinner.succeed('Download success.');
    return tempDir;
  } catch (err) {
    spinner.fail(`Failed to download repo ${template}.`);
    logger.fatal(err);
  }
}

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
        resolve(destDir);
      }
    }

    const npmTarball = `${getNpmRegistry(npm)}/${npm}/-/${npm}-${version}.tgz`;
    // logger.info('npmtra', npmTarball);
    taskComplete.entryPipe = false;
    request
      .get(npmTarball)
      .on('error', (err) => {
        reject(err);
      })
      .pipe(zlib.createGunzip())
      .pipe(new Parser())
      .on('entry', (entry) => {
        /* eslint-disable-next-line no-useless-escape */
        const templatePathReg = new RegExp('(package\/template\/)');

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
async function getNpmVersion(npm, version) {
  if (version) {
    return getNpmLatestSemverVersion(npm, version);
  }
  return getLatestVersion(npm);
}

module.exports = getTemplate;
