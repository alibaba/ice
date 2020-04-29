const path = require('path');
const fse = require('fs-extra');
const camelCase = require('camelcase');
const readFiles = require('fs-readdir-recursive');
const pkgDir = require('pkg-dir');
const glob = require('glob');
const transfromTsToJs = require('sylvanas');
const extractTarball = require('../../lib/extractTarball');
const log = require('../../lib/log');
const { TEMP_PATH } = require('../../lib/constants');
const getNpmTarball = require('../../lib/getNpmTarball');
const getNpmRegistry = require('../../lib/getNpmRegistry');

module.exports = async (options, destDir) => {
  const tempDir = TEMP_PATH;

  await fse.ensureDir(tempDir);
  try {
    const blockDirPath = await addBlock(options, destDir, tempDir);
    await fse.remove(tempDir);
    log.info('add block success, you can import and use block in your page code', blockDirPath);
  } catch(err) {
    fse.removeSync(tempDir);
    throw err;
  }
};

async function addBlock(options, destDir, tempDir) {
  // eslint-disable-next-line prefer-const
  let { npmName, name: blockDirName } = options;
  log.verbose('addBlockToProject', options);

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
      return getNpmRegistry(npmName, null, null, true);
    })
    .then((registry) => {
      return getNpmTarball(npmName, 'latest', registry);
    })
    .then((tarballURL) => {
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

      const blockType = getBlockType(tempDir);
      const projectType = getProjectType(blockDirPath);
      const blockSourceSrcPath = path.join(tempDir, 'src');

      log.verbose('blockType: ', blockType, 'projectType: ', projectType);

      if (blockType === 'ts' && projectType === 'js') {
        // transfrom ts to js
        const files = glob.sync('**/*.@(ts|tsx)', {
          cwd: blockSourceSrcPath,
        });
        log.verbose('transfrom ts to js', files);
        transfromTsToJs(files, {
          cwd: blockSourceSrcPath,
          outDir: blockSourceSrcPath,
          action: 'overwrite',
        });
      }
      return fse.copy(blockSourceSrcPath, blockDirPath, {
        overwrite: false,
        errorOnExist: true,
      });
    })
    .then(() => {
      return blockDirPath;
    });
}

function getBlockType(blockDirPath) {
  const files = readFiles(path.join(blockDirPath, 'src'));

  const index = files.findIndex(item => {
    return /\.ts(x)/.test(item);
  });

  return index >= 0 ? 'ts' : 'js';
}

function getProjectType(destDir) {
  const projectDir = pkgDir.sync(destDir);

  log.verbose('projectDir: ', projectDir);

  const hasTsconfig = fse.existsSync(path.join(projectDir, 'tsconfig.json'));
  const hasAppJs = fse.existsSync(path.join(projectDir, 'src/app.js')) || fse.existsSync(path.join(projectDir, 'src/app.jsx'));

  // icejs 都有 tsconfig，因此需要通过 src/app.js[x] 进一步区分
  return (hasTsconfig && !hasAppJs) ? 'ts' : 'js';
}
