const path = require('path');
const fse = require('fs-extra');
const camelCase = require('camelcase');
const { getNpmTarball } = require('ice-npm-utils');
const extractTarball = require('../../lib/extractTarball');
const log = require('../../lib/log');

module.exports = async (options) => {
  const tempDir = path.resolve(options.destDir, '.tmp');

  await fse.ensureDir(tempDir);
  try {
    const blockDirPath = await addBlock(options, tempDir);
    await fse.removeS(tempDir);
    log.info('add block success, you can import and use block in your page code', blockDirPath);
  } catch(err) {
    fse.removeSync(tempDir);
    throw err;
  }
};

async function addBlock(options, tempDir) {
  // eslint-disable-next-line prefer-const
  let { npmName, destDir, name: blockDirName } = options;

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
      const tarballURL = getNpmTarball(npmName, 'latest');
      log.verbose('getNpmTarball', tarballURL);

      return extractTarball({
        tarballURL,
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
