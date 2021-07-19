import { init, parse } from 'es-module-lexer';
import { IRedirectImportOptions, RedirectImportType } from './types';

let initd = false;

const MATCH_REG_EXP = /\{(.*?)\}/;

export default async function redirectImport(code: string, options: IRedirectImportOptions): Promise<string> {
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
          addImports.push(`\n${generateImport(targetRedirect)}`);
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
    } else {
      // Default condition: import runApp from 'ice';
      if (redirectImports.length > 1) {
        console.error('redirectImports length should be 1 with default export!');
      }
      return `${code.substring(0, targetImport.ss)}${generateImport(redirectImports[0])}${code.substring(targetImport.se)}`;
    }
  }
  return code;
}

function generateImport(redirectImportInfo: RedirectImportType): string {
  const { name, redirectPath, default: exportDefault } = redirectImportInfo;
  if (exportDefault) {
    return `import ${name} from '${redirectPath}';`;
  }
  return `import { ${name} } from '${redirectPath}';`;
}
