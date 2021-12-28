import path = require('path');
import analyzeRuntime, { globSourceFile, getImportPath } from '../analyzeRuntime';

describe('get source file', () => {
  const rootDir = path.join(__dirname, './fixtures/analyzeRuntime/');
  it('glob js/ts files', async () => {
    const files = await globSourceFile(rootDir);
    expect(files.length).toBe(3);
  });
});

describe('get aliased path', () => {
  const rootDir = path.join(__dirname, './fixtures/analyzeRuntime/');
  it('webpack alias: { ice: \'./runApp\' }', () => {
    const aliasedPath = getImportPath('ice', {
      rootDir,
      alias: { ice: './runApp' },
      mode: 'webpack',
    });
    // file not exists throw error
    expect(aliasedPath).toBe(undefined);
  });

  it('webpack alias: { ice: \'react\' }', () => {
    const aliasedPath = getImportPath('ice', {
      rootDir,
      alias: { ice: 'react' },
      mode: 'webpack',
    });
    expect(aliasedPath).toBe('');
  });

  it('webpack alias: { @: \'rootDir\' }', () => {
    const aliasedPath = getImportPath('@/page', {
      rootDir,
      alias: { '@': rootDir },
      mode: 'webpack',
    });
    expect(aliasedPath).toBe(path.join(rootDir, 'page/index.js'));
  });

  it('webpack alias: { @$: \'rootDir\' }', () => {
    const aliasedPath = getImportPath('@/page', {
      rootDir,
      alias: { '@$': rootDir },
      mode: 'webpack',
    });
    // without match any alias rule, throw error
    expect(aliasedPath).toBe(undefined);
  });

  it('vite alias: [{find: \'ice\', replacement: \'react\'}]', () => {
    const aliasedPath = getImportPath('ice', {
      rootDir,
      alias: [{ find: 'ice', replacement: 'react' }],
      mode: 'vite',
    });
    // filter node_modules dependencies
    expect(aliasedPath).toBe('');
  });

  it('vite alias: [{find: \'@\', replacement: \'rootDir\'}]', () => {
    const aliasedPath = getImportPath('@/page', {
      rootDir,
      alias: [{ find: '@', replacement: rootDir }],
      mode: 'vite',
    });
    expect(aliasedPath).toBe(path.join(rootDir, 'page/index.js'));
  });

  it('vite alias: [{find: \/@$\/, replacement: \'rootDir\'}]', () => {
    const aliasedPath = getImportPath('@/page', {
      rootDir,
      alias: [{ find: /@$/, replacement: rootDir }],
      mode: 'vite',
    });
    // without match any alias rule, throw error
    expect(aliasedPath).toBe(undefined);
  });
});

describe('Analyze Runtime', () => {
  const rootDir = path.join(__dirname, './fixtures/analyzeRuntime/');
  const entryFile = path.join(rootDir, 'index.js');
  
  it('analyze entry file', async () => {
    const checkMap = await analyzeRuntime([entryFile], { rootDir });
    expect(checkMap).toStrictEqual({
      'build-plugin-ice-request': true,
      'build-plugin-ice-auth': false,
    });
  });

  it('analyze relative import', async () => {
    const checkMap = await analyzeRuntime(
      [entryFile],
      { rootDir, analyzeRelativeImport: true, alias: { '@': path.join(rootDir)} }
    );
    expect(checkMap).toStrictEqual({
      'build-plugin-ice-request': true,
      'build-plugin-ice-auth': true,
    });
  });
});