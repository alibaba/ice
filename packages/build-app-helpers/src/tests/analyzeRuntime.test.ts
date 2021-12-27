import path = require('path');
import analyzeRuntime, { globSourceFile, getAliasedPath } from '../analyzeRuntime';

describe('get source file', () => {
  const rootDir = path.join(__dirname, './fixtures/analyzeRuntime/');
  it('glob js/ts files', async () => {
    const files = await globSourceFile(rootDir);
    expect(files.length).toBe(3);
  });
});

describe('get aliased path', () => {
  const rootDir = path.join(__dirname, './fixtures/analyzeRuntime/');
  it('{ ice: \'./runApp\' }', () => {
    const aliasedPath = getAliasedPath('ice', {
      rootDir,
      webpackAlias: { ice: './runApp' }
    });
    // file not exists throw error
    expect(aliasedPath).toBe(undefined);
  });

  it('{ ice: \'react\' }', () => {
    const aliasedPath = getAliasedPath('ice', {
      rootDir,
      webpackAlias: { ice: 'react' }
    });
    expect(aliasedPath).toBe('');
  });

  it('{ @: \'rootDir\' }', () => {
    const aliasedPath = getAliasedPath('@/page', {
      rootDir,
      webpackAlias: { '@': rootDir }
    });
    expect(aliasedPath).toBe(path.join(rootDir, 'page/index.js'));
  });

  it('{ @$: \'rootDir\' }', () => {
    const aliasedPath = getAliasedPath('@/page', {
      rootDir,
      webpackAlias: { '@$': rootDir }
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
      { rootDir, analyzeRelativeImport: true, webpackAlias: { '@': path.join(rootDir)} }
    );
    expect(checkMap).toStrictEqual({
      'build-plugin-ice-request': true,
      'build-plugin-ice-auth': true,
    });
  });
});