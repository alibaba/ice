import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { expect, describe, it } from 'vitest';
import transformImport from '../src/utils/transformImport';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('transform core js path', () => {
  const coreJsPath = '/path/to/core-js/';
  it('matched', async () => {
    const orignalCode = fs.readFileSync(path.join(__dirname, './fixtures/transformImport/match.js'), 'utf-8');
    expect(await transformImport(orignalCode, coreJsPath))
      .toBe('import \'/path/to/core-js/modules/test\';import \'react\';');
  });

  it('matched esm', async () => {
    const orignalCode = fs.readFileSync(path.join(__dirname, './fixtures/transformImport/esm.js'), 'utf-8');
    expect(await transformImport(orignalCode, coreJsPath))
      .toBe('import \'/path/to/core-js/modules/test\';export default \'a\';');
  });

  it('matched cjs', async () => {
    const orignalCode = fs.readFileSync(path.join(__dirname, './fixtures/transformImport/cjs.js'), 'utf-8');
    expect(await transformImport(orignalCode, coreJsPath))
      .toBe('require (\'/path/to/core-js/modules/test\');module.exports = {};');
  });

  it('miss match', async () => {
    const orignalCode = fs.readFileSync(path.join(__dirname, './fixtures/transformImport/missmatch.js'), 'utf-8');
    expect(await transformImport(orignalCode, coreJsPath))
      .toBe('import \'react\';');
  });

  it('string included', async () => {
    const orignalCode = fs.readFileSync(path.join(__dirname, './fixtures/transformImport/stringInclude.js'), 'utf-8');
    expect(await transformImport(orignalCode, coreJsPath))
      .toBe('import \'somepack/core-js/modules/test\';import \'react\';');
  });
  it('@swc/helpers esm', async () => {
    const orignalCode = fs.readFileSync(path.join(__dirname, './fixtures/transformImport/swc-esm.js'), 'utf-8');
    expect(await transformImport(orignalCode, coreJsPath))
      .toBe('import { _ as _object_spread } from \'@swc/helpers/_/_object_spread\';import \'react\';');
  });
  it('@swc/helpers cjs', async () => {
    const orignalCode = fs.readFileSync(path.join(__dirname, './fixtures/transformImport/swc.js'), 'utf-8');
    expect(await transformImport(orignalCode, coreJsPath))
      .toBe('var _object_spread = require(\'@swc/helpers/cjs/_object_spread.cjs\')._;module.exports = {};');
  });
  it('with import.meta', async () => {
    const orignalCode = fs.readFileSync(path.join(__dirname, './fixtures/transformImport/importMeta.js'), 'utf-8');
    expect(await transformImport(orignalCode, coreJsPath))
      .toBe('if (import.meta.rerender === \'client\') console.log(true);');
  });
});
