const path = require('path');
const fse = require('fs-extra');
const uuid = require('uuid/v1');
const rimraf = require('rimraf');
const { checkAliInternal } = require('ice-npm-utils');
const log = require('./log');
const getTarball = require('./getTarball');
const extractTarball = require('./extractTarball');

module.exports = ({ template, cwd }) => {
  return getTarball(template)
    .then((url) => {
      return extractTarball(url, cwd);
    })
    .then(() => {
      try {
        // remove build/
        rimraf.sync(path.join(cwd, 'build'));

        // modify package.json
        modifyPkg(path.join(cwd, 'package.json'));
      } catch (err) {
        log.info('modify package.json', err);
      }

      return checkAliInternal();
    })
    .then((isAliInternal) => {
      if (isAliInternal) {
        log.info('generate abc.json for inner net.');
        generateAbcFile(cwd);
      }
    });
};

function modifyPkg(pkgPath) {
  const pkgData = fse.readJsonSync(pkgPath);

  delete pkgData.files;
  delete pkgData.publishConfig;
  delete pkgData.buildConfig.output;
  delete pkgData.scaffoldConfig;
  delete pkgData.homepage;
  delete pkgData.scripts.screenshot;
  delete pkgData.scripts.prepublishOnly;

  pkgData.name += uuid();

  fse.writeJSONSync(pkgPath, pkgData, {
    spaces: 2,
  });
}

function generateAbcFile(projectDir) {
  const abcData = {
    type: 'iceworks',
    builder: '@ali/builder-iceworks',
  };

  fse.writeJSONSync(path.resolve(projectDir, 'abc.json'), abcData, {
    spaces: 2,
  });
}
