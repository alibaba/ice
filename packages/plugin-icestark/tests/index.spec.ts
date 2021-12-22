import * as babel from '@babel/core';
import * as path from 'path';

const transformSync = (code, libraryName = 'microApp', omitSetLibraryName = false) => {
  return babel.transformSync(code, {
    configFile: false,
    plugins: [
      [require.resolve('../src/babelPluginMicroapp'), {
        checkEntryFile: () => true,
        libraryName,
        omitSetLibraryName,
      }],
    ],
  }).code;
}

describe('babel-plugin-for-microap', () => {

  test('basic', () => {
    const { entry, output } = require(path.join(__dirname, './basic.js'));
    expect(transformSync(entry)).toEqual(output)
  })

  test('async-runapp', () => {
    const { entry, output } = require(path.join(__dirname, './asyncRunApp.js'));
    expect(transformSync(entry)).toEqual(output)
  })

  test('custom-lifecycles', () => {
    const { entry, output } = require(path.join(__dirname, './customLifecycles.js'));
    expect(transformSync(entry)).toEqual(output)
  })
})