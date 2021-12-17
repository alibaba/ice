import { getTheFirstEntry, isSingleEntry } from '../src/utils';

describe('vite-plugin-index-html-utils', () => {
  test('entry', () => {
    let entry: string | Record<string, string> = './src/main.tsx';

    expect(isSingleEntry(entry)).toBeTruthy();
    expect(getTheFirstEntry(entry)).toBe('./src/main.tsx');

    entry = {
      index: './src/main.tsx'
    }

    expect(isSingleEntry(entry)).toBeTruthy();
    expect(getTheFirstEntry(entry)).toBe('./src/main.tsx');

    entry = {
      index: './src/main.tsx',
      test: './src/test.tsx'
    }

    expect(isSingleEntry(entry)).toBeFalsy();
  })

});
