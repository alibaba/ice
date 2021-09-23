import type { Plugin } from 'vite';
import * as babel from '@babel/core';

export interface Entries {
  [index: string]: string | string[];
}

/**
 * Webpack's entry would be { index: ['react-dev-utils/webpackHotDevClient.js', '/src/app''] }
 * in dev mode.
 */
const lifecyclePlugin = (entries: Entries): Plugin => {
  // Turn vite input to js files
  const entryNames = Object.keys(entries)
    .reduce((pre, next) => {
      return [
        ...pre,
        // @ts-ignore
        ...(Array.isArray(entries[next]) ? entries[next] : [entries[next]])
      ];
    }, [])
    // Remove webpack hot dev client in dev
    .filter(entry => !entry.includes('react-dev-utils/webpackHotDevClient'));

  return ({
    name: 'vite-plugin-icestark-lifecycle',
    enforce: 'pre',

    async transform(code, id) {
      const isEntryFile = entryNames.some((name: string) => id.includes(name));
      if (isEntryFile) {
        // Use babel plugin to do entry ast currently.
        // Is it more preferable to use esbuild plugin?
        return babel.transformSync(code, {
          filename: 'file.ts',
          plugins: [
            [require.resolve('./babelPluginMicroapp'), {
              checkEntryFile: () => true,
              libraryName: 'microApp',
              omitSetLibraryName: false,
            }],
          ],
          presets: [require.resolve('@babel/preset-typescript')]
        }).code;

      }

      return code;
    }
  }

  );
};

export default lifecyclePlugin;
