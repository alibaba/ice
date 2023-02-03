import * as path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { expect, it, describe } from 'vitest';

import NodeRunner from '../src/service/nodeRunner';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('node runner', () => {
  const basicResolve = async (id, importee) => {
    return id.startsWith('./') ? path.resolve(path.dirname(importee!), id) : id;
  };
  const basicLoad = async (id) => {
    if (!id.endsWith('.js')) {
      return {
        externalize: id,
      };
    } else {
      const code = fs.readFileSync(id, 'utf-8');
      return {
        code,
      };
    }
  };

  it('basic', async () => {
    const rootDir = path.join(__dirname, './fixtures/nodeRunner/basic/');
    const nodeRunner = new NodeRunner({
      rootDir,
      resolveId: basicResolve,
      load: basicLoad,
    });
    const result = await nodeRunner.run('entry.js');
    expect(result.default).toBe(1);
  });
  it('cjs', async () => {
    const rootDir = path.join(__dirname, './fixtures/nodeRunner/cjs/');
    const nodeRunner = new NodeRunner({
      rootDir,
      resolveId: basicResolve,
      load: basicLoad,
    });
    const result = await nodeRunner.run('entry.js');
    expect(result.default).toBe(1);
    expect(result.a).toBe(1);
  });
  it('circular', async () => {
    const rootDir = path.join(__dirname, './fixtures/nodeRunner/circular/');
    const nodeRunner = new NodeRunner({
      rootDir,
      load: basicLoad,
    });
    const result = await nodeRunner.run('entry.js');
    expect(result.default).toEqual({
      a: 'A',
      b: 'Btest',
    });
  });
  it('export all', async () => {
    const rootDir = path.join(__dirname, './fixtures/nodeRunner/export-all/');
    const nodeRunner = new NodeRunner({
      rootDir,
      resolveId: basicResolve,
      load: basicLoad,
    });
    const result = await nodeRunner.run('entry.js');
    expect(result).toEqual({
      a: 1,
      b: 2,
    });
  });
  it('externalize', async () => {
    const rootDir = path.join(__dirname, './fixtures/nodeRunner/externalize/');
    const nodeRunner = new NodeRunner({
      rootDir,
      resolveId: basicResolve,
      load: basicLoad,
    });
    const result = await nodeRunner.run('entry.js');
    expect(typeof result.log).toBe('function');
    expect(typeof result.default).toBe('object');
  });
});