import * as path from 'path';
import * as fs from 'fs';
import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture } from '../utils/build';

const example = 'single-route';

describe(`build ${example}`, () => {
  let sizeWithOptimize = 0;
  let sizeWithoutOptimize = 0;

  test('optimize router', async () => {
    await buildFixture(example, {
      config: 'optimization.config.mts',
    });
    const dataLoaderPath = path.join(__dirname, `../../examples/${example}/build/js/framework.js`);
    sizeWithOptimize = fs.statSync(dataLoaderPath).size;
  });

  test('disable optimize router', async () => {
    await buildFixture(example);
    const dataLoaderPath = path.join(__dirname, `../../examples/${example}/build/js/framework.js`);
    sizeWithoutOptimize = fs.statSync(dataLoaderPath).size;
  });

  afterAll(async () => {
    expect(sizeWithOptimize).toBeLessThan(sizeWithoutOptimize);
    expect(sizeWithoutOptimize - sizeWithOptimize).toBeGreaterThan(6 * 1024); // reduce more than 6kb after minify
  });
});
