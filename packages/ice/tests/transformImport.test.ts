import * as path from 'path';
import { fileURLToPath } from 'url';
import { afterAll, expect, it } from 'vitest';
import fse from 'fs-extra';
import esbuild from 'esbuild';
import { createUnplugin } from 'unplugin';
import preBundleCJSDeps from '../src/service/preBundleCJSDeps';
import { scanImports } from '../src/service/analyze';
import transformImport from '../src/esbuild/transformImport';
import resolvePlugin from '../src/esbuild/resolve';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const alias = { '@': path.join(__dirname, './fixtures/scan') };
const rootDir = path.join(__dirname, './fixtures/scan');
const cacheDir = path.join(rootDir, '.cache');
const appEntry = path.join(__dirname, './fixtures/scan/app.ts');
const outdir = path.join(rootDir, 'build');

it('transform module import', async () => {
  const deps = await scanImports([appEntry], { alias, rootDir });
  const { metadata } = await preBundleCJSDeps({
    depsInfo: deps,
    cacheDir,
    alias,
    taskConfig: { mode: 'production' },
  });
  const transformImportPlugin = createUnplugin(() => transformImport(metadata, path.join(outdir, 'server'))).esbuild;
  await esbuild.build({
    entryPoints: [appEntry],
    outdir,
    plugins: [
      resolvePlugin({ alias, format: 'esm', externalDependencies: false }),
      transformImportPlugin(),
    ],
  });
  const buildContent = await fse.readFile(path.join(outdir, 'app.js'));
  expect(buildContent.includes('../../.cache/deps/@ice_runtime_client.js')).toBeTruthy();
  expect(buildContent.includes('../../.cache/deps/@ice_runtime.js')).toBeTruthy();
});

afterAll(async () => {
  await fse.remove(cacheDir);
});
