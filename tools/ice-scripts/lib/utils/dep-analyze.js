const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const babelPluginImport = interopRequire('babel-plugin-import');
const babelPluginTransformImport = interopRequire(
  'babel-plugin-transform-es2015-modules-commonjs'
);
const babelPluginExport = interopRequire(
  'babel-plugin-transform-export-extensions'
);

function interopRequire(id) {
  const module = require(id);
  return module && module.__esModule ? module.default : module;
}

function getFileContent(filepath) {
  try {
    return (
      String(fs.readFileSync(filepath))
        // 简单干掉注释
        // 对于 '//img.alicdn.com/xxx' 或者 http://xxxx 会误伤
        // 但是下面处理还是正则提取 import 语句实现的 风险很低很低
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
  var _result = null;
  const result = [];
  let reg = /require\(["']([^\)]+)["']\)/g;
  while ((_result = reg.exec(str))) {
    result.push(_result[1]);
  }
  return result;
}

// import { Button } from 'yyy';
// import { XYZ as xyz } from 'yyy';
// import XX from 'yyy/lib/yyy';
// export default from 'xxx';
// export XXX from 'yyy';
function analyzeDependenciesImport(str) {
  const result = [];
  var _result = null;
  let importStatements = '';
  let reg = /(import|export).*from.*/g;
  while ((_result = reg.exec(str))) {
    importStatements += _result[0] + '\n';
  }

  if (!importStatements) {
    return result;
  }

  const transformed = babel.transform(importStatements, {
    plugins: [
      babelPluginExport,
      [babelPluginTransformImport, { noInterop: true }],
      [babelPluginImport, { libraryName: '@icedesign/base' }],
    ],
  });

  return analyzeDependenciesRequire(transformed.code);
}

function analyzeDependencies(str) {
  return analyzeDependenciesImport(str).concat(analyzeDependenciesRequire(str));
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

// 为了让 require.resolve 可以解析 .jsx 文件
require.extensions['.jsx'] = require.extensions['.js'];
const tracedFiles = {};
module.exports = function(entryFilename) {
  let result = [];
  trace(require.resolve(entryFilename));
  return dedupe(result).filter(function(moduleName) {
    return (
      !/^\./.test(moduleName) &&
      // 基础组件
      (/(@icedesign\/base)[$\/]lib/.test(moduleName) ||
        // 业务组件
        /^(@icedesign\/)\w+/.test(moduleName))
    );
  });

  // effect 有副作用的递归
  function trace(filename) {
    if (tracedFiles[filename]) {
      return;
    }
    tracedFiles[filename] = true;
    const fileContent = getFileContent(filename);
    const _result = dedupe(analyzeDependencies(fileContent));

    result = result.concat(_result);
    _result.forEach(function(module) {
      if (/^\./.test(module)) {
        const modulePath = require.resolve(
          path.join(path.dirname(filename), module)
        );
        trace(modulePath);
      }
    });
  }
};
