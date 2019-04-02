const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const babelPluginTransformLibImport = interopRequire(
  'babel-plugin-transform-lib-import'
);
const babelPluginTransformModulesCommonjs = interopRequire(
  'babel-plugin-transform-es2015-modules-commonjs'
);
const babelPluginTransformExport = interopRequire(
  'babel-plugin-transform-export-extensions'
);

function interopRequire(id) {
  /* eslint-disable-next-line import/no-dynamic-require */
  const mod = require(id);

  /* eslint-disable-next-line no-underscore-dangle */
  return mod && mod.__esModule ? mod.default : mod;
}

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
  /* eslint-disable-next-line no-underscore-dangle */
  let _result = null;
  const result = [];

  /* eslint-disable-next-line no-useless-escape */
  const reg = /require\(["']([^\)]+)["']\)/g;

  /* eslint-disable-next-line no-cond-assign */
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
  /* eslint-disable-next-line no-underscore-dangle */
  let _result = null;
  let importStatements = '';
  const reg = /(import|export).*from.*/g;

  /* eslint-disable-next-line no-cond-assign */
  while ((_result = reg.exec(str))) {
    importStatements += `${_result[0]}\n`;
  }

  if (!importStatements) {
    return result;
  }

  const transformed = babel.transform(importStatements, {
    plugins: [
      babelPluginTransformExport,
      [babelPluginTransformModulesCommonjs, { noInterop: true }],
      [babelPluginTransformLibImport, { libraryName: '@icedesign/base' }, '@icedesign/base'],
      [babelPluginTransformLibImport, { libraryName: '@alife/next' }, '@alife/next'],
      [babelPluginTransformLibImport, { libraryName: '@alifd/next' }, '@alifd/next'],
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

// 为了让 require.resolve 可以解析 .jsx 和 .vue 文件
require.extensions['.jsx'] = require.extensions['.js'];
require.extensions['.vue'] = require.extensions['.js'];
const tracedFiles = {};
module.exports = function (entryFilename) {
  let result = [];
  trace(require.resolve(entryFilename));

  return dedupe(result);

  // effect 有副作用的递归
  function trace(filename) {
    if (tracedFiles[filename]) {
      return;
    }
    tracedFiles[filename] = true;
    const fileContent = getFileContent(filename);

    /* eslint-disable-next-line no-underscore-dangle */
    const _result = dedupe(analyzeDependencies(fileContent));

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
