const path = require('path');
const { tmpdir } = require('os');
const fse = require('fs-extra');
const camelCase = require('camelcase');
const downloadNpm = require('../lib/downloadNpm');
const log = require('../lib/log');

module.exports = (options) => {
  const destDir = process.cwd();
  const tempDir = path.resolve(tmpdir(), 'iceworks_temp');
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
  const { npmName, destDir, tempDir } = options;
  let { name: blockDirName } = options;

  // download npm block
  if (!blockDirName) {
    // @icedesign/example-block | example-block
    const name = npmName.split('/')[1] || npmName.split('/')[0];
    blockDirName = camelCase(name, { pascalCase: true });
  }
  const blockDirPath = path.resolve(destDir, blockDirName);

  return fse.pathExists(blockDirPath)
    .then((exists) => {
      if (exists) {
        return Promise.reject(new Error(`${blockDirPath} already exists, you can use cli -n option to custom block directory name`));
      }
      return Promise.resolve();
    })
    .then(() => {
      return downloadNpm({
        npmName,
        destDir: tempDir,
      });
    })
    .then(() => {
      log.info('create block directory……');
      return fse.mkdirp(blockDirPath);
    })
    .then(() => {
      log.info('copy block src files to dest blockDir');
      return fse.copy(path.join(tempDir, 'src'), blockDirPath, {
        overwrite: false,
        errorOnExist: true,
      });
    })
    .then(() => {
      return blockDirPath;
    });
}
