/* eslint-disable no-underscore-dangle, import/no-dynamic-require, no-cond-assign, no-useless-escape */

const fs = require('fs');
const path = require('path');

function getFileContent(filepath) {
  try {
    return (
      String(fs.readFileSync(filepath))
        // simply remove comments
        .replace(/\/\/.*/g, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
    );
  } catch (err) {
    console.log('Can not open file ', filepath);
    return '';
  }
}

// require()
function analyzeDependenciesRequire(str) {
  let _result = null;
  const result = [];
  const reg = /require\(["']([^\)]+)["']\)/g;
  while ((_result = reg.exec(str))) {
    result.push(_result[1]);
  }
  return result;
}

// 数组去重
function dedupe(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('[dedupe]: arr should be an array;');
  }
  const map = {};
  for (let i = 0, len = arr.length; i < len; i++) {
    const key = arr[i];
    map[key] = true;
  }
  return Object.keys(map);
}

// 为了让 require.resolve 可以解析 .jsx 和 .vue 文件
require.extensions['.jsx'] = require.extensions['.js'];
require.extensions['.vue'] = require.extensions['.js'];
const tracedFiles = {};
module.exports = function (entryFilePath) {
  let result = [];
  trace(require.resolve(entryFilePath));

  return dedupe(result);

  // effect 有副作用的递归
  function trace(filename) {
    if (tracedFiles[filename]) {
      return;
    }
    tracedFiles[filename] = true;
    const fileContent = getFileContent(filename);
    // 编译后代码和依赖模块应该均符合commonjs规范，分析require依赖即可
    const _result = dedupe(analyzeDependenciesRequire(fileContent));

    result = result.concat(_result);
    _result.forEach((module) => {
      if (/^\./.test(module)) {
        const modulePath = require.resolve(
          path.join(path.dirname(filename), module)
        );
        trace(modulePath);
      }
    });
  }
};
