import { Plugin } from 'vite';
import MagicString from 'magic-string';

/**
 * Redirect createStore API import source from 'ice' to '@ice/store';
 */
function vitePluginImportRedirect(): Plugin {
  let needSourcemap = false;

  return {
    enforce: 'pre',
    name: 'vite-plugin-store-import-redirect',
    configResolved(resolvedConfig) {
      needSourcemap = !!resolvedConfig.build.sourcemap;
    },
    transform(code, id) {
      const appStoreRegExp = /src\/store.[jt]s$/;
      const pageStoreRegExp = /src\/pages\/\w+\/store.[jt]s$/;
      if (appStoreRegExp.test(id) || pageStoreRegExp.test(id)) {
        const s = new MagicString(code);
        const matchedResult = code.match(/(createStore\s*,?).*}\s+from\s+["']ice['"]/);
        if (matchedResult) {
          /**
           * before: import { createStore, Plugin } from 'ice';
           * 
           * after:
           * import { Plugin } from 'ice';
           * import { createStore } from '@ice/store';
           */
          s.overwrite(matchedResult.index, matchedResult.index + matchedResult[1].length, '');
          s.prepend('import { createStore } from "@ice/store";\n');
        }
        return {
          map: needSourcemap ? s.generateMap({ hires: true }) : null,
          code: s.toString(),
        };
      }
      return null;
    }
  };
}

export default vitePluginImportRedirect;
