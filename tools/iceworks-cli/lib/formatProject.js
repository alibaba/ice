/**
 * format project after download npm
 */
const path = require('path');
const fse = require('fs-extra');
const { promisify } = require('util');
const rimraf = require('rimraf');
const { checkAliInternal } = require('ice-npm-utils');
const log = require('./log');

module.exports = (projectDir) => {
  return promisify(rimraf)(path.join(projectDir, 'build'))
    .then(checkAliInternal)
    .then((isAliInternal) => {
      const pkgPath = path.join(projectDir, 'package.json');
      const pkgData = fse.readJsonSync(pkgPath);
      const iceScriptsVersion = pkgData.devDependencies['ice-scripts'];

      log.info('clean package.json...');
      delete pkgData.files;
      delete pkgData.publishConfig;
      if (pkgData.buildConfig) {
        delete pkgData.buildConfig.output;
        delete pkgData.buildConfig.localization;
      }
      delete pkgData.scaffoldConfig;
      delete pkgData.homepage;
      delete pkgData.scripts.screenshot;
      delete pkgData.scripts.prepublishOnly;

      fse.writeJSONSync(pkgPath, pkgData, {
        spaces: 2,
      });

      if (isAliInternal) {
        log.info('generate abc.json...');
        generateAbcFileSync(projectDir, iceScriptsVersion);
      }

      return Promise.resolve();
    });
};

function generateAbcFileSync(projectDir, iceScriptsVersion) {
  // '^2.0.0' -> true
  const latestVersion = /^\^2\./.test(iceScriptsVersion);

  const abcData = {
    type: latestVersion ? 'ice-scripts' : 'iceworks',
    builder: latestVersion ? '@ali/builder-ice-scripts' : '@ali/builder-iceworks',
  };

  fse.writeJSONSync(path.resolve(projectDir, 'abc.json'), abcData, {
    spaces: 2,
  });

  if (latestVersion) {
    log.info('If you need to deploy with DEF, please refer to the doc: https://yuque.alibaba-inc.com/ice/rdy99p/angwyx');
  } else {
    log.info('If you need to deploy with DEF, please refer to the doc: https://yuque.alibaba-inc.com/ice/rdy99p/syvuzh');
  }
}
