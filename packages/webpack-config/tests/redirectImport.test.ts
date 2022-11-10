import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { expect, describe, it } from 'vitest';
import { redirectImport } from '../src/unPlugins/redirectImport';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('redirect import', () => {
  const exportData = [{
    specifier: ['runApp'],
    source: '@ice/runtime',
  }, {
    specifier: 'Head',
    source: 'react-helmet',
    alias: {
      Head: 'Helmet',
    },
  }, {
    specifier: 'store',
    source: '@ice/store',
  }, {
    specifier: 'request',
    source: 'axios',
  }];

  it('basic transform', async () => {
    const code = fs.readFileSync(path.join(__dirname, './fixtures/redirectImport/basic.js'), 'utf-8');
    const transformed = await redirectImport(code, { exportData, targetSource: 'ice' });
    expect(transformed).toBe('import { runApp } from \'@ice/runtime\';');
  });

  it('as transform', async () => {
    const code = fs.readFileSync(path.join(__dirname, './fixtures/redirectImport/as.js'), 'utf-8');
    const transformed = await redirectImport(code, { exportData, targetSource: 'ice' });
    expect(transformed).toBe('import { runApp as run } from \'@ice/runtime\';');
  });

  it('alias transform', async () => {
    const code = fs.readFileSync(path.join(__dirname, './fixtures/redirectImport/alias.js'), 'utf-8');
    const transformed = await redirectImport(code, { exportData, targetSource: 'ice' });
    expect(transformed).toBe('import Helmet as Head from \'react-helmet\';');
  });


  it('alias with as transform', async () => {
    const code = fs.readFileSync(path.join(__dirname, './fixtures/redirectImport/aliasWithAs.js'), 'utf-8');
    const transformed = await redirectImport(code, { exportData, targetSource: 'ice' });
    expect(transformed).toBe('import Helmet as Header from \'react-helmet\';');
  });

  it('multiple transform', async () => {
    const code = fs.readFileSync(path.join(__dirname, './fixtures/redirectImport/multiple.js'), 'utf-8');
    const transformed = await redirectImport(code, { exportData, targetSource: 'ice' });
    expect(transformed).toBe('import request from \'axios\';\nimport store from \'@ice/store\';');
  });
});