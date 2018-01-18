'use strict';

var async = require('async');
var childProcess = require('child_process');
var colors = require('chalk');
var fs = require('fs');
var glob = require('glob');
var log = require('fancy-log');
var mkdirp = require('mkdirp');
var os = require('os');
var path = require('path');
var prettyBytes = require('pretty-bytes');
var prettyMs = require('pretty-ms');
var rightPad = require('right-pad');
var uglifyBinPath = path.join(__dirname, '../../node_modules/.bin/uglifyjs');

// uglify js in child_process
function job(options, callback) {
  var file = options.file;
  var params = options.params || [];
  var dest = options.dest;

  var hasCommentsParams = false;

  for (var i = params.length - 1; i >= 0; i--) {
    if (params[i].indexOf('--comments') !== -1) {
      hasCommentsParams = true;
      break;
    }
  }

  if (!hasCommentsParams) {
    params.push('--comments=/^\\**!|@preserve|@license/');
  }

  mkdirp(path.dirname(dest), function(mkdirPathError) {
    if (mkdirPathError) {
      return callback(mkdirPathError);
    }

    var source_map_params = [];
    if (options.sourceMap) {
      source_map_params = [
        '--source-map',
         dest + '.map' ,
        '--source-map-url',
        path.basename(file) + '.map',
        '--in-source-map',
        dest + '.map'
      ];
    }

    
    var psParams = [file, '-o', dest].concat(params).concat(source_map_params);
    var stdoutPrint = '';
    var stderrPrint = '';

    var ps = childProcess.spawn(uglifyBinPath, psParams, {
      stdio: 'pipe'
    });

    var start = new Date();

    ps.stdout &&
      ps.stdout.on('data', data => {
        stdoutPrint += String(data);
      });

    ps.stderr &&
      ps.stderr.on('data', data => {
        stderrPrint += String(data);
      });

    ps.on('close', function(code, sig) {
      if (code !== 0) {
        console.log(stdoutPrint);
        console.log(stderrPrint);
        callback(`压缩文件 ${file} 错误, exit code: ${code}, sig: ${sig}`);
      } else {
        var now = new Date();
        var stats = fs.statSync(dest);
        log(
          colors.magenta(rightPad(prettyBytes(stats.size), 7)),
          rightPad(prettyMs(now - start), 6),
          colors.blue(path.relative(process.cwd(), dest))
        );
        callback(null);
      }
    });
  });
}

module.exports = function uglify(options, globOptions, callback) {
  if (typeof callback === 'undefined') {
    callback = globOptions;
    globOptions = {
      cwd: options.src
    };
  } else {
    globOptions.cwd = options.src;
  }

  glob(options.pattern, globOptions, function(err, files) {
    if (err) {
      return callback(err);
    }
    if (!files.length) {
      return callback();
    }

    var parallelNum = options.parallel || os.cpus().length;
    var tasks = files.map(function(f) {
      return {
        file: path.join(options.src, f),
        dest: path.resolve(process.cwd(), options.dest, f),
        params: options.params || [],
        sourceMap: options.sourceMap
      };
    });
    var q = async.queue(job, parallelNum);
    var runned = 0;
    var total = files.length;

    q.push(tasks, function(error) {
      if (error) {
        return callback(error);
      }
      // 直到所有进程任务完成
      if (++runned == total) {
        callback();
      }
    });
  });
};