/**
 * 添加区块
 */
const path = require('path');
const fse = require('fs-extra');
const camelCase = require('camelcase');
const downloadNpm = require('../lib/downloadNpm');
const log = require('../lib/log');

module.exports = (options) => {
  const destDir = process.cwd();
  const tempDir = path.resolve(destDir, '.iceworks_temp');
  options.destDir = destDir;
  options.tempDir = tempDir;

  return fse.ensureDir(tempDir).then(() => {
    return addBlock(options);
  }).catch((err) => {
    fse.removeSync(tempDir);
    log.error(`add block error: ${err.message}`);
    console.error(err);
    process.exit(1);
  }).then((blockDirPath) => {
    fse.removeSync(tempDir);
    log.info('add block success, you can import and use block in your page code', blockDirPath);
  });
};

async function addBlock(options = {}) {
  const { template, destDir, tempDir } = options;
  let { name: blockDirName } = options;

  if (!template) {
    // 添加空白区块
    const blockDirPath = path.resolve(destDir, blockDirName || 'EmptyBlock');
    const blockTemplatePath = path.resolve(__dirname, '../template/EmptyBlock');

    return checkDirExist(blockDirPath)
      .then(() => {
        return fse.mkdirp(blockDirPath);
      })
      .then(() => {
        return fse.copy(blockTemplatePath, blockDirPath, {
          overwrite: false,
          errorOnExist: true,
        });
      })
      .then(() => {
        return blockDirPath;
      });
  }

  // 下载 npm 区块
  let blockDirPath;
  return downloadNpm({
    npmName: template,
    destDir: tempDir,
  })
    .then(() => {
      log.info('start create block directory……');

      if (!blockDirName) {
        // eslint-disable-next-line import/no-dynamic-require
        const blockPkg = require(path.join(tempDir, 'package.json'));
        const npmName = blockPkg.name;
        // @icedesign/example-block | example-block
        const name = npmName.split('/')[1] || npmName.split('/')[0];
        blockDirName = camelCase(name, { pascalCase: true });
      }
      blockDirPath = path.resolve(destDir, blockDirName);

      return checkDirExist(blockDirPath);
    })
    .then(() => {
      return fse.mkdirp(blockDirPath);
    })
    .then(() => {
      log.info('start copy block src files to dest blockDir');
      return fse.copy(path.join(tempDir, 'src'), blockDirPath, {
        overwrite: false,
        errorOnExist: true,
      });
    })
    .then(() => {
      return blockDirPath;
    });
}

async function checkDirExist(dirPath) {
  return fse.pathExists(dirPath)
    .then((exists) => {
      if (exists) {
        return Promise.reject(new Error(`${dirPath} already exists, you can use cli -n option to custom block directory name`));
      }
      return Promise.resolve();
    });
}
