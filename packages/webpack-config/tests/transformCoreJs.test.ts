import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { expect, describe, it } from 'vitest';
import transformCoreJs from '../src/utils/transformCoreJs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('transform core js path', () => {
  const coreJsPath = '/path/to/core-js/';
  it('matched', async () => {
    const orignalCode = fs.readFileSync(path.join(__dirname, './fixtures/transformCoreJs/match.js'), 'utf-8');
    expect(await transformCoreJs(orignalCode, coreJsPath)).toBe('import \'/path/to/core-js/modules/test\';');
  });

  it('miss match', async () => {
    const orignalCode = fs.readFileSync(path.join(__dirname, './fixtures/transformCoreJs/missmatch.js'), 'utf-8');
    expect(await transformCoreJs(orignalCode, coreJsPath)).toBe('import \'react\';');
  });

  it('string included', async () => {
    const orignalCode = fs.readFileSync(path.join(__dirname, './fixtures/transformCoreJs/stringInclude.js'), 'utf-8');
    expect(await transformCoreJs(orignalCode, coreJsPath)).toBe('import \'somepack/core-js/modules/test\';');
  });
});