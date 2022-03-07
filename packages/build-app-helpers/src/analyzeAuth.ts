import * as fse from 'fs-extra';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

function parseCode(code: string) {
  return parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript', 'decorators-legacy', 'dynamicImport', 'classProperties'],
  });
}

function checkAuthConfig(sourcePath: string) {
  if (!fse.existsSync(sourcePath)) {
    const ext = ['.ts', '.js', '.tsx', '.jsx'].find((extension) => fse.existsSync(`${sourcePath}${extension}`));
    if (!ext) {
      throw new Error(`can not found file: ${sourcePath}`);
    }
    sourcePath = `${sourcePath}${ext}`;
  }
  const code = fse.readFileSync(sourcePath, 'utf-8');
  const ast = parseCode(code);
  
  let hasAuthConfig = false;
  let hasConfigInitialData = false;
  traverse(ast, {
    ObjectExpression(nodePath) {
      const { node } = nodePath;
      let isAppConfig = false;
      node.properties.forEach((property) => {
        if (t.isObjectMethod(property) || t.isObjectProperty(property)) {
          if (!hasConfigInitialData) {
            hasConfigInitialData = t.isIdentifier(property.key) && property.key.name === 'getInitialData';
            if (hasConfigInitialData) {
              // 存在 getInitialData 的配置，判定当前 ObjectExpression 为 appConfig
              isAppConfig = true;
            }
          }
          // 判断非 appConfig 上的 auth 配置
          if (!isAppConfig && !hasAuthConfig) {
            hasAuthConfig = t.isIdentifier(property.key) && property.key.name === 'auth';
          }
        }
      });
    },
  });
  return hasAuthConfig && hasConfigInitialData;
}

export default checkAuthConfig;
