import { init, parse } from 'es-module-lexer';
import { IRedirectImportOptions, RedirectImportType } from './types';

let initd = false;

const IMPORT_MATCH_REG_EXP = /\{(.*?)\}/;
const IMPORT_DEFAULT_MATCH_REG_EXP = /^import\s+([^\s{},]+)/;
const AS_ALIAS_REG_EXP = /^(\w+)\s+as\s+(\w+)/;

export default async function redirectImport(code: string, options: IRedirectImportOptions): Promise<string> {
  if (!initd) {
    await init;
    initd = true;
  }
  const { source, redirectImports } = options;
  const [imports] = parse(code);
  const targetImport = imports.find(({ n }) => {
    if (typeof source === 'string') {
      return n === source;
    }
    return source(n);
  });
  if (targetImport) {
    // importStr => 'import { runApp, usePageShow } from "ice"'
    let importStr = code.substring(targetImport.ss, targetImport.se);
    // Get runApp, usePageShow
    const result = IMPORT_MATCH_REG_EXP.exec(importStr);
    if (result) {
      const importedStr = result[1];
      const addImports = [];
      // ['runApp', 'usePageShow']
      const identifiers = importedStr.split(',');
      identifiers.forEach(identifier => {
        if (AS_ALIAS_REG_EXP.test(identifier)) {
          console.warn('Not support `as` alias with redirect: ', importStr);
          return;
        }
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

      let redirectImportInfo = redirectImports[0];
      if (!redirectImportInfo.name) {
        // if not pass the import default name, use the origin name
        const importDefaultMatchResult = IMPORT_DEFAULT_MATCH_REG_EXP.exec(importStr);
        if (importDefaultMatchResult) {
          const importDefaultName = importDefaultMatchResult[1];
          redirectImportInfo = { ...redirectImportInfo, name: importDefaultName };
        }
      }
      return `${code.substring(0, targetImport.ss)}${generateImport(redirectImportInfo)}${code.substring(targetImport.se)}`;
    }
  }
  return code;
}

function generateImport(redirectImportInfo: RedirectImportType): string {
  const { name, redirectPath, default: exportDefault } = redirectImportInfo;
  if (exportDefault) {
    return `import ${name} from '${redirectPath}'`;
  }
  return `import { ${name} } from '${redirectPath}'`;
}
