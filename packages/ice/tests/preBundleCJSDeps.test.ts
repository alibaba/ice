import { afterAll, expect, it } from 'vitest';
import * as path from 'path';
import fse from 'fs-extra';
import { fileURLToPath } from 'url';
import preBundleCJSDeps from '../src/service/preBundleCJSDeps';
import { scanImports } from '../src/service/analyze';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const alias = { '@': path.join(__dirname, './fixtures/scan') };
const rootDir = path.join(__dirname, './fixtures/scan');
const cacheDir = path.join(rootDir, '.ice');

it('prebundle cjs deps', async () => {
  const deps = await scanImports([path.join(__dirname, './fixtures/scan/app.ts')], { alias, rootDir });
  await preBundleCJSDeps({
    depsInfo: deps,
    cacheDir,
    taskConfig: { mode: 'production' }
  });

  expect(fse.pathExistsSync(path.join(cacheDir, 'deps', 'react.js'))).toBeTruthy();
  expect(fse.pathExistsSync(path.join(cacheDir, 'deps', '@ice_runtime_client.js'))).toBeTruthy();
  expect(fse.pathExistsSync(path.join(cacheDir, 'deps', '@ice_runtime.js'))).toBeTruthy();
});

afterAll(async () => {
  await fse.remove(cacheDir);
});
