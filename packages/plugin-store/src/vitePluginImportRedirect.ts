import { Plugin } from 'vite';
import MagicString from 'magic-string';
import { init, parse } from 'es-module-lexer';

/**
 * Redirect API import source from 'ice' to real path in store file
 */
function vitePluginImportRedirect(getImportDeclarations): Plugin {
  let needSourcemap = false;
  const importDeclarations = getImportDeclarations();

  return {
    enforce: 'pre',
    name: 'vite-plugin-store-import-redirect',
    configResolved(resolvedConfig) {
      needSourcemap = !!resolvedConfig.build.sourcemap;
    },
    async transform(code, id) {
      const appStoreRegExp = /src\/store.[jt]s$/;
      const pageStoreRegExp = /src\/pages\/\w+\/store.[jt]s$/;
      if (appStoreRegExp.test(id) || pageStoreRegExp.test(id)) {
        await init;
        const [imports] = parse(code);
        const s = new MagicString(code);
        for (let index = 0; index < imports.length; index++) {
          const importSpecifier = imports[0];
          const importSource = code.substring(importSpecifier.s, importSpecifier.e);
          if (importSource !== 'ice') {
            // eslint-disable-next-line no-continue
            continue;
          }
          const importStr = code.substring(importSpecifier.ss, importSpecifier.se);
          /**
           * need to match 3 cases:
           * 1. import { createStore } from 'ice';
           * 2. import { createStore, request } from 'ice';
           * 3. import {
           *      createStore,
           *      request,
           *    } from 'ice';
           */
          const matchedResult = importStr.match(/{([\s\S]*)}\s+from\s+["']ice['"]/);
          if (matchedResult) {
            const [, importIdentifiersStr] = matchedResult;
            const replaceSpaceImportIdentifiersStr = importIdentifiersStr.replace(/\s+/g, '');
            const importIdentifiersArray = replaceSpaceImportIdentifiersStr.split(',').filter(item => item);
        
            let newImportStr = '';
            /**
             * e.g.: importDeclarationSources = { '@ice/store': ['createStore', 'IStore'] }
             */
            const normalImportSources: { [key: string]: string[] } = {};
        
            importIdentifiersArray.forEach((importIdentifier: string) => {
              const { value, type } = importDeclarations[importIdentifier];
              if (type === 'default') {
                newImportStr += `import ${importIdentifier} from '${value}';\n`;
              } else {
                // handle normal import
                // eslint-disable-next-line no-lonely-if
                if (normalImportSources[value]) {
                  normalImportSources[value].push(importIdentifier);
                } else {
                  normalImportSources[value] = [importIdentifier];
                }
              } 
            });
            // generate normal import strings
            Object.keys(normalImportSources).forEach(sourceKey => {
              const importIdentifiers = normalImportSources[sourceKey];
              newImportStr += `import { ${importIdentifiers.join(', ')} } from '${sourceKey}';\n`;
            });
            // overwrite `import { xxx } from 'ice';` statement
            s.overwrite(importSpecifier.ss, importSpecifier.se, newImportStr);
          }
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
