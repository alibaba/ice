/**
 * download and format project
 *
 * 1. download npm（转换文件名称 formatFilename）
 * 2. format(remove build dir, modify pkg, add abc)
 */
const path = require('path');
const fse = require('fs-extra');
const chalk = require('chalk');
const { checkAliInternal } = require('ice-npm-utils');
const getNpmTarball = require('../../lib/getNpmTarball');
const getNpmRegistry = require('../../lib/getNpmRegistry');
const extractTarball = require('../../lib/extractTarball');
const log = require('../../lib/log');

/**
 * 下载 npm 后的文件名处理
 */
function formatFilename(filename) {
  // 只转换特定文件，防止误伤
  const dotFilenames = [
    '_eslintrc.js',
    '_eslintrc',
    '_eslintignore',
    '_gitignore',
    '_stylelintrc.js',
    '_stylelintrc',
    '_stylelintignore',
    '_editorconfig',
  ];
  if (dotFilenames.indexOf(filename) !== -1) {
    // _eslintrc.js -> .eslintrc.js
    filename = filename.replace(/^_/, '.');
  }

  return filename;
}

module.exports = async ({ npmName, cwd }) => {
  const registry = await getNpmRegistry(npmName, null, null, true);
  const tarballURL = await getNpmTarball(npmName, 'latest', registry);
  await extractTarball({
    tarballURL,
    destDir: cwd,
    formatFilename,
  });

  try {
    await fse.remove(path.join(cwd, 'build'));
    await formatProjectFile(cwd);
  } catch (err) {
    log.warn('formatProject error');
    console.error(err);
  }
  console.log();
  console.log('Initialize project successfully.');
  console.log();
  console.log('Starts the development server.');
  console.log();
  console.log(chalk.cyan('    npm install'));
  console.log(chalk.cyan('    npm start'));
  console.log();
};

async function formatProjectFile(projectDir) {
  let abcData = {};
  const abcPath = path.join(projectDir, 'abc.json');
  const pkgPath = path.join(projectDir, 'package.json');
  const pkgData = fse.readJsonSync(pkgPath);
  pkgData.devDependencies = pkgData.devDependencies || {};

  log.info('clean package.json...');

  // modify package.json
  delete pkgData.files;
  delete pkgData.publishConfig;
  delete pkgData.scaffoldConfig;
  delete pkgData.homepage;
  if (pkgData.buildConfig) {
    delete pkgData.buildConfig.output;
    delete pkgData.buildConfig.localization;
  }
  if (pkgData.scripts) {
    delete pkgData.scripts.screenshot;
    delete pkgData.scripts.prepublishOnly;
  }

  const isAliInternal = await checkAliInternal();
  if (isAliInternal) {
    log.info('generate abc.json...', pkgData.devDependencies);
    if (pkgData.devDependencies['@alib/build-scripts']) {
      log.verbose('build-scripts project');
      abcData = {
        type: 'ice-app',
        builder: '@ali/builder-ice-app',
      };
      pkgData.devDependencies['@ali/build-plugin-ice-def'] = '^0.1.0';

      // modify build.json
      const buildJsonPath = path.join(projectDir, 'build.json');
      const buildData = fse.readJsonSync(buildJsonPath);
      buildData.plugins = buildData.plugins || [];

      buildData.plugins.push('@ali/build-plugin-ice-def');

      fse.writeJSONSync(buildJsonPath, buildData, {
        spaces: 2,
      });
    } else if (pkgData.devDependencies['ice-scripts']) {
      log.verbose('ice-scripts project');
      const buildVersion = pkgData.devDependencies['ice-scripts'];
      // ^1.y.z, ~1.y.z, 1.x
      const is1X = /^(\^|~|)1\./.test(buildVersion);
      abcData = {
        type: 'ice-scripts',
        builder: is1X ? '@ali/builder-iceworks' : '@ali/builder-ice-scripts',
      };

      if (!is1X) {
        // TODO: 操作 ice.config.js 加入 ice-plugin-def；删除 publicPath
        log.info('If you need to deploy with DEF, please refer to the doc: https://yuque.alibaba-inc.com/ice/rdy99p/angwyx');
      }
    }
  }

  fse.writeJSONSync(pkgPath, pkgData, {
    spaces: 2,
  });
  fse.writeJSONSync(abcPath, abcData, {
    spaces: 2,
  });
}
