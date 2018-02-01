'use strict';

var async = require('async');
var spawn = require('cross-spawn');
var colors = require('chalk');
var debug = require('debug')('clean-css-parallel');
var fs = require('fs');
var glob = require('glob');
var log = require('fancy-log');
var mkdirp = require('mkdirp');
var os = require('os');
var path = require('path');
var prettyBytes = require('pretty-bytes');
var prettyMs = require('pretty-ms');
var rightPad = require('right-pad');
const bin = require.resolve('clean-css/bin/cleancss');

/**
 * 执行任务
 *
 * @param {Object} options
 *   dest: required, path
 *   src: required, path
 *   pattern: required, regexp string
 *   parallel: option, number, 默认为系统内核数目
 *   params: option, object, cleancss 的参数
 */
module.exports = function(options, callback) {
  glob(
    options.pattern,
    {
      cwd: options.src,
    },
    function(err, files) {
      debug('glob files', files);

      if (err) {
        throw Error(err);
      }

      if (!files.length) {
        return callback(null);
      }

      var parallelNum = options.parallel || os.cpus().length;
      var taskArgs = files.map(function(file) {
        return {
          srcFilePath: path.join(options.src, file),
          destFilePath: path.resolve(process.cwd(), options.dest, file),
          params: options.params,
        };
      });

      var q = async.queue(singleTask, parallelNum);
      var runned = 0;
      var total = files.length;

      q.push(taskArgs, function(err) {
        // 内部抛出错误，避免外部未抛出，流程正常结束
        if (err) {
          throw err;
        }

        if (++runned == total) {
          callback(null);
        }
      });
    }
  );
};

/**
 * 压缩单个文件
 *
 * @param  {options} options
 *   srcFilePath
 *   destFilePath
 *   params
 */
function singleTask(options, callback) {
  // debug('singTask', options);
  debug('运行一个任务');

  var srcFilePath = options.srcFilePath;
  var params = options.params;
  var destFilePath = options.destFilePath;

  mkdirp(path.dirname(options.destFilePath), function(err) {
    if (err) {
      return callback(err);
    }

    var cmdArgs = [srcFilePath, '-o', destFilePath].concat(params);

    // debug('命令行参数：', cmdArgs);

    var ps = spawn(bin, cmdArgs, {
      stdio: 'inherit',
    });

    var start = new Date();

    ps.on('close', function(code) {
      if (code !== 0) {
        callback(new Error(`压缩文件 ${srcFilePath} 错误, exit code: ${code}`));
      } else {
        var now = new Date();
        var stats = fs.statSync(destFilePath);
        log(
          colors.magenta(rightPad(prettyBytes(stats.size), 7)),
          rightPad(prettyMs(now - start), 6),
          colors.blue(path.relative(process.cwd(), destFilePath))
        );
        callback(null);
      }
    });
  });
}
