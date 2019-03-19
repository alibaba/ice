/**
 * 构建项目生成 dist ，根据传入的路径地址，按照 ICE page 的规则搜寻代码，并启动编译服务
 * @param {String} cwd 项目目录
 * @param {Object} options 命令行参数
 */

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
const validationSassAvailable = require('./utils/validationSassAvailable');

module.exports = async function(options) {
  const { customWebpackConfig, cliOptions } = options || {};
  const cwd = process.cwd();

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
