import * as path from 'path';
import { fileURLToPath } from 'url';
import { expect, it, describe } from 'vitest';
import { analyzeImports, getImportPath, resolveId, type Alias } from '../src/service/analyze';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('resolveId', () => {
  it('alias: { ice: \'/.ice/runApp\'}; id: ice', () => {
    const alias = { ice: '/.ice/runApp' };
    const id = resolveId('ice', alias);
    expect(id).toBe('/.ice/runApp');
  });
  it('alias: { ice: \'/.ice/runApp\'}; id: ice/test', () => {
    const alias = { ice: '/.ice/runApp' };
    const id = resolveId('ice/test', alias);
    expect(id).toBe('/.ice/runApp/test');
  });
  it('alias: { ice$: \'/.ice/runApp\'}; id: ice/test', () => {
    const alias = { ice$: '/.ice/runApp' };
    const id = resolveId('ice/test', alias);
    expect(id).toBe('ice/test');
  });
  it('alias: { ice: false}; id: false', () => {
    const alias = { ice: false } as Alias;
    const id = resolveId('ice', alias);
    expect(id).toBe(false);
  });
  it('alias: { foundnamejs: \'/user/folder\'}; id: foundnamejs', () => {
    const alias = { foundnamejs: '/user/folder' };
    const id = resolveId('foundnamejs', alias);
    expect(id).toBe('/user/folder');
  });

  it('alias with relative path', () => {
    const alias = { ice: 'rax' } as Alias;
    const id = resolveId('ice', alias);
    expect(id).toBe('rax');
  });
});

describe('getImportPath', () => {
  it('import from relative path', () => {
    const filePath = getImportPath('./page.js', '/rootDir/test.ts', {});
    // Compatible with test case in win32.
    expect(filePath.replace(/^[A-Za-z]:/, '')).toBe('/rootDir/page.js');
  });
  it('import from alias', () => {
    const filePath = getImportPath('ice', '/rootDir/test.ts', { ice: '/rootDir/component.tsx' });
    expect(filePath).toBe('/rootDir/component.tsx');
  });
  it('import node_module dependency', () => {
    const filePath = getImportPath('ice', '/rootDir/test.ts', {});
    expect(filePath).toBe('');
  });
});

describe('analyzeImports', () => {
  it('basic usage', async () => {
    const entryFile = path.join(__dirname, './fixtures/preAnalyze/app.ts');
    const analyzeSet = await analyzeImports([entryFile], {
      analyzeRelativeImport: true,
      alias: {
        '@': path.join(__dirname, './fixtures/preAnalyze'),
      },
    });
    expect([...(analyzeSet || [])]).toStrictEqual(['runApp', 'request', 'store']);
  });
});