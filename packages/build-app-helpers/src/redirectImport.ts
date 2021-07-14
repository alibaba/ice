import { init, parse } from 'es-module-lexer';
import { IRedirectImportOptions } from './types';

let initd = false;

const MATCH_REG_EXP = /\{(.*?)\}/;

export default async function redirectImport(code: string, options: IRedirectImportOptions) {
  if (!initd) {
    await init;
    initd = true;
  }
  const { source, redirectImports } = options;
  const [imports] = parse(code);
  const targetImport = imports.find(({ n }) => n === source);
  if (targetImport) {
    // importStr => 'import { runApp, usePageShow } from "ice"'
    let importStr = code.substring(targetImport.ss, targetImport.se);
    // Get runApp, usePageShow
    const result = MATCH_REG_EXP.exec(importStr);
    if (result) {
      const importedStr = result[1];
      const addImports = [];
      // ['runApp', 'usePageShow']
      const identifiers = importedStr.split(',');
      identifiers.forEach(identifier => {
        const targetRedirect = redirectImports.find(({ name }) => name === identifier.trim() );
        if (targetRedirect) {
          // import { runApp } from 'ice/entries/home/runApp';
          addImports.push(`\nimport ${targetRedirect.default ?
            redirectImport.name : `{ ${targetRedirect.name} }`} from '${targetRedirect.redirectPath}';`);
          importStr = importStr.replace(new RegExp(`${identifier},?`), '');
        }
      });
      let newImportStr = '';
      // Check should it retain original import str
      if (addImports.length !== identifiers.length) {
        newImportStr += `${importStr};`;
      }
      newImportStr += addImports.join('');
      return `${code.substring(0, targetImport.ss)}${newImportStr}${code.substring(targetImport.se)}`;
    }
  }
  return code;
}
