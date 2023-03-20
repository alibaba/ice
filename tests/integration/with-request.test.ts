import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test, describe } from 'vitest';
import { buildFixture } from '../utils/build';

// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const example = 'with-request';

describe(`build ${example}`, () => {
  test('data-loader build file', async () => {
    await buildFixture(example);
    const content = fs.readFileSync(path.join(__dirname, `../../examples/${example}/build/js/data-loader.js`), 'utf-8');
    expect(content.includes('react.element')).toBe(false);
  });
});
