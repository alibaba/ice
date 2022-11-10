import moduleLexer from '@ice/bundles/compiled/es-module-lexer/index.js';
import MagicString from '@ice/bundles/compiled/magic-string/index.js';

const { init, parse } = moduleLexer;
const transformCoreJs = async (source: string, coreJsPath: string) => {
  await init;
  const imports = parse(source)[0];
  let s: MagicString | undefined;
  const str = () => s || (s = new MagicString(source));
  imports.forEach((targetImport) => {
    if (targetImport.n.startsWith('core-js/modules/')) {
      str().overwrite(targetImport.s, targetImport.e, targetImport.n.replace('core-js/', coreJsPath));
    }
  });
  return s ? s.toString() : source;
};

export default transformCoreJs;
