import { init, parse } from 'es-module-lexer';
import { IRedirectImportOptions, RedirectImportType } from './types';

let initd = false;

// import { About } from './About';
const IMPORT_MATCH_REG_EXP = /\{(.*?)\}/;
// import About from './About';
// import About, { Home } from './About';
const IMPORT_DEFAULT_MATCH_REG_EXP = /^import\s+([^\s{},]+)/;
// import('/modules/my-module.js')
const DYNAMIC_IMPORT_MATCH_REG_EXP = /^import\([\S\s]*['"](.*)['"]/;

const AS_ALIAS_REG_EXP = /^(\w+)\s+as\s+(\w+)/;

export default async function redirectImport(code: string, options: IRedirectImportOptions): Promise<string> {
  if (!initd) {
    await init;
    initd = true;
  }
  const { source, redirectImports } = options;
  const [imports] = parse(code);
  const targetImport = imports.find(({ n }) => {
    if (typeof source === 'function') {
      return source(n);
    }
    return n === source;
  });
  if (targetImport) {
    // importStr => 'import { runApp, usePageShow } from "ice"'
    let importStr = code.substring(targetImport.ss, targetImport.se);
    // Get runApp, usePageShow
    const importMatchResult = IMPORT_MATCH_REG_EXP.exec(importStr);
    const dynamicImportMatchResult = DYNAMIC_IMPORT_MATCH_REG_EXP.exec(importStr);
    if (importMatchResult) {
      const importedStr = importMatchResult[1];
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
      newImportStr += addImports.join(';');
      return `${code.substring(0, targetImport.ss)}${newImportStr}${code.substring(targetImport.se)}`;
    } else if (dynamicImportMatchResult) {
      const originModule = dynamicImportMatchResult[1];
      const newImportStr = importStr.replace(originModule, redirectImports[0].redirectPath);
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
  const { name, redirectPath, alias, default: exportDefault } = redirectImportInfo;
  const importSpecifier = alias ? `${alias} as ${name}` : name;
  if (exportDefault) {
    return `import ${importSpecifier} from '${redirectPath}'`;
  }
  return `import { ${importSpecifier} } from '${redirectPath}'`;
}
