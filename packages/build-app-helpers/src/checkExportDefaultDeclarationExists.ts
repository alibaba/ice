import * as fse from 'fs-extra';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

function parseCode(code) {
  return parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript', 'decorators-legacy', 'dynamicImport', 'classProperties'],
  });
}

function checkExportDefaultDeclarationExists(sourcePath: string) {
  if (!fse.existsSync(sourcePath)) {
    const ext = ['.ts', '.js', '.tsx', '.jsx'].find((extension) => fse.existsSync(`${sourcePath}${extension}`));
    if (!ext) {
      return;
    }
    sourcePath = `${sourcePath}${ext}`;
  }
  const code = fse.readFileSync(sourcePath, 'utf-8');
  const ast = parseCode(code);

  let exportDefaultDeclarationExists = false;
  traverse(ast, {
    ExportDefaultDeclaration() {
      exportDefaultDeclarationExists = true;
    },
  });

  return exportDefaultDeclarationExists;
}

export default checkExportDefaultDeclarationExists;
