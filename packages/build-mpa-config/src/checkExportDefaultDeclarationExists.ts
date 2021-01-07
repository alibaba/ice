import * as fse from 'fs-extra';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

function checkExportDefaultDeclarationExists(sourcePath: string) {
  const ext = ['.ts', '.js', '.tsx', '.jsx'].find((extension) => fse.existsSync(`${sourcePath}${extension}`));
  if (!ext) {
    return;
  }

  const code = fse.readFileSync(`${sourcePath}${ext}`, 'utf-8');
  const ast = parseCode(code);

  let exportDefaultDeclarationExists = false;
  traverse(ast, {
    ExportDefaultDeclaration() {
      exportDefaultDeclarationExists = true;
    },
  });

  return exportDefaultDeclarationExists;
}

function parseCode(code) {
  return parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });
}

export default checkExportDefaultDeclarationExists;
