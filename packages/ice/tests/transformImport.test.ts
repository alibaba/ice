import { afterAll, expect, it } from 'vitest';
import * as path from 'path';
import fse from 'fs-extra';
import { fileURLToPath } from 'url';
import preBundleCJSDeps from '../src/service/preBundleCJSDeps';
import { scanImports } from '../src/service/analyze';
import esbuild from 'esbuild';
import transformImport from '../src/esbuild/transformImport';
import aliasPlugin from '../src/esbuild/alias';
import { createUnplugin } from 'unplugin';

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
    taskConfig: { mode: 'production' }
  });
  const transformImportPlugin = createUnplugin(() => transformImport(metadata, path.join(outdir, 'server'))).esbuild;
  await esbuild.build({
    entryPoints: [appEntry],
    outdir,
    plugins: [
      aliasPlugin({ alias, format: 'esm', externalDependencies: false }),
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
