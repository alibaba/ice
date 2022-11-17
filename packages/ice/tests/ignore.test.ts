import * as path from 'path';
import { fileURLToPath } from 'url';
import { afterAll, expect, it, describe } from 'vitest';
import fse from 'fs-extra';
import esbuild from 'esbuild';
import ignorePlugin from '../src/esbuild/ignore';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, './fixtures/ignore');
const cacheDir = path.join(rootDir, '.cache');
const appEntry = path.join(__dirname, './fixtures/ignore/app.ts');
const outfile = path.join(rootDir, 'build/index.js');
const buildOptions = {
  bundle: true,
  entryPoints: [appEntry],
  outfile,
};

describe('esbuild ignore plugin', () => {
  it('ignore with resourceRegExp', async () => {
    await esbuild.build({
      ...buildOptions,
      plugins: [
        ignorePlugin([{
          resourceRegExp: /ignored/,
        }]),
      ],
    });
    const buildContent = await fse.readFile(outfile);
    expect(buildContent.includes('ignored')).toBeFalsy();
    expect(buildContent.includes('page')).toBeTruthy();
  });

  it('ignore with resourceRegExp', async () => {
    await esbuild.build({
      ...buildOptions,
      plugins: [
        ignorePlugin([{
          resourceRegExp: /.*/,
          contextRegExp: /dir/,
        }]),
      ],
    });
    const buildContent = await fse.readFile(outfile);
    expect(buildContent.includes('ignored')).toBeTruthy();
    expect(buildContent.includes('page')).toBeTruthy();
    expect(buildContent.includes('content')).toBeFalsy();
  });

  it('ignore with resourceRegExp', async () => {
    await esbuild.build({
      ...buildOptions,
      plugins: [
        // @ts-ignore error options
        ignorePlugin({}),
      ],
    });
    const buildContent = await fse.readFile(outfile);
    expect(buildContent.includes('ignored')).toBeTruthy();
    expect(buildContent.includes('page')).toBeTruthy();
    expect(buildContent.includes('content')).toBeTruthy();
  });

  afterAll(async () => {
    await fse.remove(cacheDir);
  });
});
