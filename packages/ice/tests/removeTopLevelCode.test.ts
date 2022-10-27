import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { expect, it, describe } from 'vitest';
import { parse, type ParserOptions } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import removeTopLevelCodePlugin from '../src/utils/babelPluginRemoveCode';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const parserOptions: ParserOptions = {
  sourceType: 'module',
  plugins: [
    'jsx',
    'importMeta',
    'topLevelAwait',
    'classProperties',
    'classPrivateMethods',
    'typescript',
    'decorators-legacy',
  ],
};

describe('remove top level code', () => {
  it('remove specifier export', () => {
    const ast = parse(fs.readFileSync(path.join(__dirname, './fixtures/removeCode/export-specifier.ts'), 'utf-8'), parserOptions);
    traverse(ast, removeTopLevelCodePlugin(['getConfig']));
    const content = generate(ast).code;
    expect(content.replace(/\n/g, '').replace(/\s+/g, ' ')).toBe('const getConfig = () => {};export { getConfig };');
  });
  it('remove variable export', () => {
    const ast = parse(fs.readFileSync(path.join(__dirname, './fixtures/removeCode/export-variable.ts'), 'utf-8'), parserOptions);
    traverse(ast, removeTopLevelCodePlugin(['getConfig']));
    const content = generate(ast).code;
    expect(content.replace(/\n/g, '').replace(/\s+/g, ' ')).toBe('export const getConfig = () => {};');
  });
  it('remove function export', () => {
    const ast = parse(fs.readFileSync(path.join(__dirname, './fixtures/removeCode/function-exports.ts'), 'utf-8'), parserOptions);
    traverse(ast, removeTopLevelCodePlugin(['getConfig']));
    const content = generate(ast).code;
    expect(content.replace(/\n/g, '').replace(/\s+/g, ' ')).toBe('export function getConfig() {}');
  });
  it('remove if statement', () => {
    const ast = parse(fs.readFileSync(path.join(__dirname, './fixtures/removeCode/if.ts'), 'utf-8'), parserOptions);
    traverse(ast, removeTopLevelCodePlugin(['getConfig']));
    const content = generate(ast).code;
    expect(content).toBe('');
  });
  it('remove import statement', () => {
    const ast = parse(fs.readFileSync(path.join(__dirname, './fixtures/removeCode/import.ts'), 'utf-8'), parserOptions);
    traverse(ast, removeTopLevelCodePlugin(['getConfig']));
    const content = generate(ast).code;
    expect(content.replace(/\n/g, '').replace(/\s+/g, ' ')).toBe('export function getConfig() { return { a: 1 };}');
  });
  it('remove mixed import statement', () => {
    const ast = parse(fs.readFileSync(path.join(__dirname, './fixtures/removeCode/mixed-import.tsx'), 'utf-8'), parserOptions);
    traverse(ast, removeTopLevelCodePlugin(['getConfig']));
    const content = generate(ast).code;
    expect(content.replace(/\n/g, '').replace(/\s+/g, ' ')).toBe('export function getConfig() { return { a: 1 };}');
  });
  it('remove IIFE code', () => {
    const ast = parse(fs.readFileSync(path.join(__dirname, './fixtures/removeCode/iife.ts'), 'utf-8'), parserOptions);
    traverse(ast, removeTopLevelCodePlugin(['getConfig']));
    const content = generate(ast).code;
    expect(content).toBe('');
  });
  it('remove loop code', () => {
    const ast = parse(fs.readFileSync(path.join(__dirname, './fixtures/removeCode/while.ts'), 'utf-8'), parserOptions);
    traverse(ast, removeTopLevelCodePlugin(['getConfig']));
    const content = generate(ast).code;
    expect(content).toBe('');
  });
  it('remove nested reference code', () => {
    const ast = parse(fs.readFileSync(path.join(__dirname, './fixtures/removeCode/reference.ts'), 'utf-8'), parserOptions);
    traverse(ast, removeTopLevelCodePlugin(['getConfig']));
    const content = generate(ast).code;
    expect(content).toBe('');
  });

  it('remove variable declaration code', () => {
    const ast = parse(fs.readFileSync(path.join(__dirname, './fixtures/removeCode/vars.ts'), 'utf-8'), parserOptions);
    traverse(ast, removeTopLevelCodePlugin(['getConfig']));
    const content = generate(ast).code;
    expect(content.replace(/\n/g, '').replace(/\s+/g, ' ')).toBe('import c from \'c\';import d from \'d\';const [x] = c;const { k} = d;export function getConfig() { return { x, k };}');
  });

  it('keep export default', () => {
    const ast = parse(fs.readFileSync(path.join(__dirname, './fixtures/removeCode/export-default.ts'), 'utf-8'), parserOptions);
    traverse(ast, removeTopLevelCodePlugin(['default']));
    const content = generate(ast).code;
    expect(content.replace(/\n/g, '').replace(/\s+/g, ' ')).toBe('const a = 1;export default a;');
  });

  it('remove expression statement', () => {
    const ast = parse(fs.readFileSync(path.join(__dirname, './fixtures/removeCode/expression.ts'), 'utf-8'), parserOptions);
    traverse(ast, removeTopLevelCodePlugin(['default']));
    const content = generate(ast).code;
    expect(content.replace(/\n/g, '').replace(/\s+/g, ' ')).toBe('');
  });
});