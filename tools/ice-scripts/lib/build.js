/**
 * 构建项目生成 dist ，根据传入的路径地址，按照 ICE page 的格则搜寻代码，并启动编译服务
 * @param {String} cwd 项目目录
 * @param {Object} options 命令行参数
 */

process.env.NODE_ENV = 'production';

const cleancssParallel = require('../dependencies/clean-css-parallel');
const uglifyParallel = require('../dependencies/uglify-parallel');
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
  // build task
  gulp.task('build', ['clean'], function() {
    const buildTasks = ['webpack'];
    if (!args.debug) {
      buildTasks.push('uglify-js');
      buildTasks.push('minify-css');
    }
    gulp.start(buildTasks);
  });

  gulp.task('clean', function(done) {
    rimraf(paths.appBuild, done);
  });

  gulp.task('install', function() {
    return npmInstall();
  });

  // webpack 打包工作流
  gulp.task('webpack', ['install'], function(done) {
    // 指定构建的 entry
    // @TODO 可构建多页面
    const pacageData = require(paths.appPackageJson);
    // get ice config by package.ice

    const webpackConfig = getWebpackConfigProd(entries, paths, pacageData.ice);

    webpack(webpackConfig, function(error, stats) {
      console.log(
        stats.toString({
          colors: true,
          chunks: false,
          children: false,
          modules: false,
          chunkModules: false,
        })
      );
      done(error);
    });
  });

  // 并行压缩基于多进程，不适合使用 gulp 插件文件流的方式，直接异步任务
  gulp.task('uglify-js', ['webpack'], function() {
    console.log('after compression:');
    return new Promise(function(resolve) {
      uglifyParallel(
        {
          pattern: '**/*.js',
          src: paths.appBuild,
          dest: paths.appBuild,
          params: [
            '--compress',
            'unused=false,warnings=false',
            '--beautify',
            'beautify=false,ascii-only=true',
            '--mangle',
          ],
        },
        function(error) {
          if (error) {
            console.log('压缩 JS 文件失败，请根据提示检查相应文件。');
            console.log(error);
          } else {
            resolve();
          }
        }
      );
    });
  });

  // js 压缩使用了多核，css 的压缩等待 js 压缩完成
  gulp.task('minify-css', ['uglify-js'], function() {
    return new Promise(function(resolve) {
      cleancssParallel(
        {
          pattern: '**/*.css',
          src: paths.appBuild,
          dest: paths.appBuild,
          params: [],
        },
        function() {
          resolve();
        }
      );
    });
  });

  gulp.start('build', function(err) {
    if (err) {
      console.log('ICE BUILD ERROR');
      console.log(err.stack);
    } else {
      console.log('ICE build finished');
    }
  });
};
