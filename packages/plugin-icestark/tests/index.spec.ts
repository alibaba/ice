import * as babel from '@babel/core';
import * as path from 'path';

const transformSync = (code, entry, libraryName = 'microApp', omitSetLibraryName = false) => {
  return babel.transformSync(code, {
    plugins: [
      [require.resolve('../src/babelPluginMicroapp'), {
        entryList: [path.join(__dirname, entry)],
        libraryName,
        omitSetLibraryName,
      }],
    ],
  }).code;
}

describe('babel-plugin-for-microap', () => {

  test('basic', () => {
    const { entry, output } = require(path.join(__dirname, './basic.js'));
    expect(transformSync(entry, './basic.js')).toEqual(output)
  })

  test('async-runapp', () => {
    const { entry, output } = require(path.join(__dirname, './asyncRunApp.js'));
    expect(transformSync(entry, './asyncRunApp.js')).toEqual(output)
  })

  test('custom-lifecycles', () => {
    const { entry, output } = require(path.join(__dirname, './customLifecycles.js'));
    expect(transformSync(entry, './customLifecycles.js')).toEqual(output)
  })
})