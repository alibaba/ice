/**
 * 构建项目生成 dist ，根据传入的路径地址，按照 ICE page 的格则搜寻代码，并启动编译服务
 * @param {String} cwd 项目目录
 * @param {Object} options 命令行参数
 */

process.env.NODE_ENV = 'production';

const cleancssParallel = require('clean-css-parallel');
const gulp = require('gulp');
const rimraf = require('rimraf');
const webpack = require('webpack');

const getPaths = require('./config/paths');
const getEntries = require('./config/getEntry');
const getWebpackConfigProd = require('./config/webpack.config.prod');
const npmInstall = require('./helpers/npmInstall');

module.exports = function(args = {}) {
  const cwd = process.cwd();
  const paths = getPaths(cwd);
  const entries = getEntries(cwd);
  // 指定构建的 entry
  // @TODO 可构建多页面
  // eslint-disable-next-line
  const packageData = require(paths.appPackageJson);
  // get ice config by package.ice

  const webpackConfig = getWebpackConfigProd(
    entries,
    paths,
    packageData.buildConfig || packageData.ice
  );

  // build task
  gulp.task('build', ['clean'], () => {
    const buildTasks = ['webpack'];
    if (!args.debug) {
      buildTasks.push('minify-css');
    }
    gulp.start(buildTasks);
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
      done();
    });
  });

  // js 压缩使用了多核，css 的压缩等待 js 压缩完成
  gulp.task('minify-css', ['webpack'], () => {
    return new Promise((resolve) => {
      cleancssParallel(
        {
          pattern: '**/*.css',
          src: webpackConfig.output.path,
          dest: webpackConfig.output.path,
          params: [],
        },
        () => {
          resolve();
        }
      );
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
