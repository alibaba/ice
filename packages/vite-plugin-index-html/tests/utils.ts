import { isSingleEntry } from '../src/utils';

describe('vite-plugin-index-html-utils', () => {
  test('entry', () => {
    let entry: string | Record<string, string> = './src/main.tsx';

    expect(isSingleEntry(entry)).toBeTruthy();

    entry = {
      index: './src/main.tsx'
    }

    expect(isSingleEntry(entry)).toBeTruthy();

    entry = {
      index: './src/main.tsx',
      test: './src/test.tsx'
    }

    expect(isSingleEntry(entry)).toBeFalsy();
  })

});
