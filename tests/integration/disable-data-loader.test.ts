import * as path from 'path';
import * as fs from 'fs';
import { expect, test, describe } from 'vitest';
import { buildFixture } from '../utils/build';

const example = 'disable-data-loader';

describe(`build ${example}`, () => {
  test('open /', async () => {
    await buildFixture(example);
    expect(fs.existsSync(path.join(__dirname, `../../examples/${example}/build/js/data-loader.js`))).toBe(false);
  }, 120000);
});