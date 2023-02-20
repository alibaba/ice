import * as path from 'path';
import { fileURLToPath } from 'url';
import { afterAll, expect, it } from 'vitest';
import fse from 'fs-extra';
import preBundleDeps from '../src/service/preBundleDeps';
import { scanImports } from '../src/service/analyze';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const alias = { '@': path.join(__dirname, './fixtures/scan') };
const rootDir = path.join(__dirname, './fixtures/scan');
const cacheDir = path.join(rootDir, '.cache');

it('prebundle cjs deps', async () => {
  const deps = await scanImports([path.join(__dirname, './fixtures/scan/app.ts')], { alias, rootDir });
  await preBundleDeps(deps, {
    cacheDir,
    alias,
    rootDir,
    taskConfig: { mode: 'production' },
  });
  expect(fse.pathExistsSync(path.join(cacheDir, 'deps', 'react.mjs'))).toBeTruthy();
  expect(fse.pathExistsSync(path.join(cacheDir, 'deps', '@ice_runtime_client.mjs'))).toBeTruthy();
  expect(fse.pathExistsSync(path.join(cacheDir, 'deps', '@ice_runtime.mjs'))).toBeTruthy();
});

afterAll(async () => {
  await fse.remove(cacheDir);
});
