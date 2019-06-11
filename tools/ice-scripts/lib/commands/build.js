const fse = require('fs-extra');
const webpack = require('webpack');
const iceScriptsPkgData = require('../../package.json');
const goldlog = require('../utils/goldlog');
const log = require('../utils/log');
const checkDepsInstalled = require('../utils/checkDepsInstalled');

/**
 * 构建项目：cli 调用；云构建方法调用
 *
 * 因为 build 方法有可能被直接调用，因此需要保证自身功能的完整性
 *
 * @param {Object} options 命令行参数
 */
module.exports = async function (context) {
  const { applyHook, commandArgs, rootDir, webpackConfig } = context;
  goldlog('version', {
    version: iceScriptsPkgData.version,
  });
  goldlog('build', commandArgs);
  log.verbose('build cliOptions', commandArgs);
  await applyHook('beforeBuild');

  const installedDeps = checkDepsInstalled(rootDir);
  if (!installedDeps) {
    log.error('项目依赖未安装，请先安装依赖。');
    process.exit(1);
  }

  // empty output path
  fse.emptyDirSync(webpackConfig.output.path);
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (error, stats) => {
      if (error) {
        return reject(error);
      }
      console.log(
        stats.toString({
          colors: true,
          chunks: false,
          children: false,
          modules: false,
          chunkModules: false,
        })
      );
      if (stats.hasErrors()) {
        return reject(new Error('webpack compiled failed.'));
      }
      log.info('ICE build finished');
      applyHook('afterBuild', stats);
      resolve();
    });
  });
};
