// TODO: 感觉不太合适
process.env.NODE_ENV = 'production';

const gulp = require('gulp');
const rimraf = require('rimraf');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const { collectDetail } = require('@alifd/fusion-collector');

const pkgData = require('../package.json');
const paths = require('./config/paths');
const getEntries = require('./config/getEntry');
const getWebpackConfigProd = require('./config/webpack.config.prod');
const npmInstall = require('./helpers/npmInstall');
const goldlog = require('./utils/goldlog');
const log = require('./utils/log');
const cliInstance = require('./utils/cliInstance');
const validationSassAvailable = require('./utils/validationSassAvailable');

/**
 * 构建项目
 *  - cli 调用
 *  - 云构建方法调用
 *
 * @param {Object} options 命令行参数
 */
module.exports = async function(options) {
  const { customWebpackConfig, cliOptions } = options || {};
  const cwd = process.cwd();

  // 云构建不走 cli，而是直接调用 build 方法，因此这里需要设置下 cli 参数
  if (cliOptions) {
    cliInstance.set(cliOptions);
  }

  goldlog('version', {
    version: pkgData.version
  });
  goldlog('build', cliOptions);
  log.verbose('build cliOptions', cliOptions);

  validationSassAvailable();

  try {
    collectDetail({
      rootDir: cwd, // 项目根地址
      basicPackage: ['@alifd/next', '@icedesign/base', '@alife/next'], // 主体包名称
      kit: 'ice-scripts', // 统计的来源
    });
  } catch (err) {
    log.warn('collectDetail error', err);
  }

  const entries = getEntries(cwd);
  // eslint-disable-next-line
  const packageData = require(paths.appPackageJson);
  // get ice config by package.ice

  let webpackConfig = getWebpackConfigProd({
    entry: entries,
    buildConfig: packageData.buildConfig || packageData.ice,
  });
  webpackConfig = webpackMerge(webpackConfig, customWebpackConfig);

  // build task
  gulp.task('build', ['clean'], () => {
    gulp.start(['webpack']);
  });

  gulp.task('clean', (done) => {
    rimraf(webpackConfig.output.path, done);
  });

  gulp.task('install', () => {
    return npmInstall();
  });

  // webpack 打包工作流
  gulp.task('webpack', (done) => {
    webpack(webpackConfig, (error, stats) => {
      if (error) {
        throw error;
      } else {
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
          throw new Error('webpack compiled failed.');
        }
      }

      done();
    });
  });

  gulp.start('build', (err) => {
    if (err) {
      console.log('ICE BUILD ERROR');
      console.log(err.stack);
    } else {
      console.log('ICE build finished');
    }
  });
};
