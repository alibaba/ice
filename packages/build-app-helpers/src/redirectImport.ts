import { init, parse } from 'es-module-lexer';

let initd = false;

const MATCH_REG_EXP = /\{(.*?)\}/;

export default async function redirectImport(code: string, options) {
  if (!initd) {
    await init;
    initd = true;
  }
  const { source, redirectImports } = options;
  const [imports] = parse(code);
  const targetImport = imports.find(({ n }) => n === source);
  if (targetImport) {
    let importStr = code.substring(targetImport.ss, targetImport.se);
    const originalImportStr = importStr;
    const result = MATCH_REG_EXP.exec(importStr);
    if (result) {
      const importedStr = result[1];
      const addImports = [];
      const identifiers = importedStr.split(',');
      identifiers.forEach(identifier => {
        const targetRedirect = redirectImports.find(({ name }) => name === identifier.trim() );
        if (targetRedirect) {
          addImports.push(`\nimport ${targetRedirect.default ?
            redirectImport.name : `{ ${targetRedirect.name} }`} from '${targetRedirect.redirectPath}'`);
          importStr = importStr.replace(new RegExp(`${identifier},?`), '');
        }
      });
      let newImportStr = '';
      if (addImports.length !== identifiers.length) {
        newImportStr += `${importStr};`;
      }
      newImportStr += addImports.join('');
      return code.replace(originalImportStr, newImportStr);
    }
  }
  return code;
}
