// 读取需要编译的文件
'use strict';
const colors = require('chalk');
const fs = require('fs');
const path = require('path');

const hotDevClientPath = require.resolve('react-dev-utils/webpackHotDevClient');

const walk = function walk(dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else results.push(file);
  });
  return results;
};

/**
 * 获取 abc.json 文件里指定的 entry 内容
 * @param  {Objecct} abcConfig abc.json 文件内容
 * @return {Object}           如果存在则返回  abc.webpack.entry
 */
const getEntryByAbc = function (appDirectory) {
  const abcFilePath = path.resolve(appDirectory, 'abc.json');

  try {
    const abcConfig = require(abcFilePath);
    if (abcConfig && abcConfig.webpack) {
      if (abcConfig.webpack.entry) {
        console.log(
          colors.yellow('请知晓! 当前编译页面为 abc.json 里指定的 entry !')
        );
        var costomEntry = abcConfig.webpack.entry;
        return costomEntry;
      }
    }
  } catch (e) { }

  return null;
};

/**
 * 获取项目中符合 src/pages/xxxx/index.jsx 的文件
 * 或者在 abc.webpack.entry 对象，这个优先级最高
 *
 * @param  {Object} abcConfig abc.json 的对象
 * @return {Object}           entry 的 kv 对象
 */

module.exports = function getEntry(cwd, isBuild = true) {
  var entryObj = {};
  const appDirectory = fs.realpathSync(cwd);
  const packageFilePath = path.resolve(appDirectory, 'package.json');
  const packageData = require(packageFilePath);
  // 需要区分项目类型，新版的项目直接返回 src/index.js
  if (packageData) {
    let entry = '';
    if (packageData.ice && packageData.ice.entry) {
      entry = packageData.ice.entry;
    }
    if (packageData.buildConfig && packageData.buildConfig.entry) {
      entry = packageData.buildConfig.entry;
    }

    entryObj = {
      index: [path.resolve(appDirectory, entry)],
    };

    if (!isBuild) {
      entryObj.index.unshift(hotDevClientPath);
    }

    return entryObj;
  }

  // abcConfig.webpack.entry 的优先级比 pages 高
  const customEntry = getEntryByAbc(appDirectory);

  if (customEntry && Object.keys(customEntry).length) {
    return customEntry;
  }

  var entryDir = './src';

  try {
    // 获取当前目录下所有文件
    var files = walk(entryDir);
    files.forEach(function (filePath) {
      var fileExt = path.extname(filePath);
      var fileBasename = path.basename(filePath, fileExt);
      var pageFile = path.relative(entryDir, filePath);

      var pageDirTree = pageFile.split(path.sep);

      if (
        (fileExt === '.jsx' ||
          fileExt === '.js' ||
          fileExt === '.tsx' ||
          fileExt === '.ts') &&
        fileBasename === 'index' &&
        pageDirTree.length === 3 &&
        pageDirTree[0] === 'pages'
      ) {
        pageDirTree.pop();
        pageDirTree.push('index');
        var pageName = pageDirTree.join('/');

        if (isBuild) {
          entryObj[pageName] = [filePath];
        } else {
          entryObj[pageName] = [hotDevClientPath, filePath];
        }
      }
    });
    return entryObj;
  } catch (err) {
    throw err;
  }
};
