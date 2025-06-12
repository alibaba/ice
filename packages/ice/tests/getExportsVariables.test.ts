import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from 'vitest';
import { getExportsVariables } from '../src/utils/getExportsVariables';

const __dirname = fileURLToPath(path.dirname(import.meta.url));

test('getExportsVariables', async () => {
  const exports = await getExportsVariables(path.resolve(__dirname, './fixtures/exports.ts'));
  expect(exports).toStrictEqual(['a', 'myFunc', 'MyClass', 'c', 'anotherFunc', 'foo', 'bar', 'default', 'qux', 'aaa']);
});
