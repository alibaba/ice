import type { Plugin } from 'vite';
import * as babel from '@babel/core';

export interface Entries {
  [index: string]: string | string[];
}

const lifecyclePlugin = (entries: Entries): Plugin => {
  // Turn vite input to js files
  const entryNames = Object.keys(entries).map(key =>  Array.isArray(entries[key]) ? entries[key][0] : entries[key]);
  return ({
    name: 'vite-plugin-icestark-lifecycle',
    enforce: 'pre',

    async transform(code, id) {
      const isEntryFile = entryNames.some((name: string) => id.includes(name));

      if (isEntryFile) {
        const code1 = babel.transformSync(code, {
          filename: 'file.ts',
          plugins: [
            [require.resolve('./babelPluginMicroapp'), {
              entryList: ['file.ts'],
              libraryName: 'microApp',
              omitSetLibraryName: false,
            }],
          ],
          presets: [require.resolve('@babel/preset-typescript')]
        }).code;

        return code1;
      }

      return code;
    }
  }

  );
};

export default lifecyclePlugin;
