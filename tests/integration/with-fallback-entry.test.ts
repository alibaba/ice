import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { expect, test, describe } from 'vitest';
import { buildFixture } from '../utils/build';
// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const example = 'with-fallback-entry';

describe(`build ${example}`, () => {
  let sizeServer = 0;
  let sizeFallback = 0;

  test('build fallback entry', async () => {
    await buildFixture(example);
    const serverPath = path.join(__dirname, `../../examples/${example}/build/server/index.cjs`);
    sizeServer = fs.statSync(serverPath).size;
    const fallbackPath = path.join(__dirname, `../../examples/${example}/build/server/index.fallback.cjs`);
    sizeFallback = fs.statSync(fallbackPath).size;

    expect(sizeFallback).toBeLessThan(sizeServer);
    // The Stat size of fallback entry will reduce more than 50kb, minify size is 20kb.
    expect(sizeServer - sizeFallback).toBeGreaterThan(20 * 1024);
  });
});
