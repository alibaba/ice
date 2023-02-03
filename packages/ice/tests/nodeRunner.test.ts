import * as path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { expect, it, describe } from 'vitest';

import NodeRunner from '../src/service/nodeRunner';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('node runner', () => {
  const basicResolve = async (id, importee) => {
    return path.resolve(path.dirname(importee!), id);
  };
  const basicLoad = async (id) => {
    const code = fs.readFileSync(id, 'utf-8');
    return {
      code,
    };
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
  });
});