import path from 'path';
import moduleLexer from '@ice/bundles/compiled/es-module-lexer/index.js';
import MagicString from '@ice/bundles/compiled/magic-string/index.js';

const { init, parse } = moduleLexer;
const transformCoreJs = async (source: string, coreJsPath: string) => {
  await init;
  const [imports, exports] = parse(source);
  let s: MagicString | undefined;
  const formatPath = coreJsPath.split(path.sep).join('/');
  const str = () => s || (s = new MagicString(source));
  const isESM = exports.length > 0 || imports.some((targetImport) => !targetImport.n.includes('core-js'));
  imports.forEach((targetImport) => {
    if (targetImport.n.startsWith('core-js/modules/')) {
      const coreJsMoudle = targetImport.n.replace('core-js/',
        formatPath.endsWith('/') ? formatPath : `${formatPath}/`);
      // ESM
      if (isESM) {
        str().overwrite(
          targetImport.s,
          targetImport.e,
          coreJsMoudle);
      } else {
        // CJS
        str().overwrite(
          targetImport.ss,
          targetImport.se,
          `require ('${coreJsMoudle}')`);
      }
    }
  });
  return s ? s.toString() : source;
};

export default transformCoreJs;
