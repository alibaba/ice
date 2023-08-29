import path from 'path';
import moduleLexer from '@ice/bundles/compiled/es-module-lexer/index.js';
import MagicString from '@ice/bundles/compiled/magic-string/index.js';

const { init, parse } = moduleLexer;

const transformImport = async (source: string, coreJsPath: string) => {
  await init;
  const [imports, exports] = parse(source);
  let s: MagicString | undefined;
  const formatPath = coreJsPath.split(path.sep).join('/');
  const str = () => s || (s = new MagicString(source));
  const isESM = exports.length > 0 || imports.some((targetImport) => {
    const importString = targetImport.n;
    // `targetImport.n` get undefined when code has `import.meta.*`.
    return importString && !importString.includes('core-js') && !importString.includes('@swc/helpers');
  });
  imports.forEach((targetImport) => {
    if (!targetImport.n) {
      // If visiting `import.meta.*`, `targetImport.n` will be undefined, that should be ignored.
      return;
    }
    if (targetImport.n.startsWith('core-js/modules/')) {
      const replaceModule = targetImport.n.replace('core-js/',
        formatPath.endsWith('/') ? formatPath : `${formatPath}/`);
      // ESM
      if (isESM) {
        str().overwrite(
          targetImport.s,
          targetImport.e,
          replaceModule);
      } else {
        // CJS
        str().overwrite(
          targetImport.ss,
          targetImport.se,
          `require ('${replaceModule}')`);
      }
    } else if (targetImport.n.startsWith('@swc/helpers')) {
      if (!isESM) {
        // Replace @swc/helpers with cjs path.
        const importStr = source.substring(targetImport.ss, targetImport.se);
        // Import rule: import { _ as _type_of } from "@swc/helpers/_/_type_of";
        const matchImport = importStr.match(/import\s+{\s+([\w*\s{},]*)\s+}\s+from\s+['"](.*)['"]/);
        if (matchImport) {
          const [,identifier] = matchImport;
          const replaceModule = `var ${identifier.split(' as ')[1].trim()} = require('${targetImport.n.replace(/@swc\/helpers\/_\/(.*)$/,
            (_, matched) => `@swc/helpers/cjs/${matched}.cjs`)}')._`;
          str().overwrite(targetImport.ss, targetImport.se, replaceModule);
        }
      }
    }
  });
  return s ? s.toString() : source;
};

export default transformImport;
