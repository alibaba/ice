import * as path from 'path';
import * as ts from 'typescript';
import { lstatSync, pathExists, readdir } from 'fs-extra';
import { curry } from 'lodash-es';

/**
 * 匹配后缀为 `.css` 的文件名
 * 
 * @param {string} prefix 文件所在文件夹路径
 * @param {string} name 文件名
 * 
 * @return {boolean} 是否是 css 文件
 */
export const detectCssFile = curry((prefix: string, name: string): boolean => {
  const filePath = path.resolve(prefix, name);
  const stat = lstatSync(filePath);
  return !stat.isDirectory() && name.split('.').pop() === 'css';
});

/**
 * 通过文件路径名称获取主题名
 */
export const getThemeName = (filePath: string) => {
  return filePath.replace(/(.*\/)*([^.]+).*/ig, '$2');
};

/**
 * 获取初始化主题，如果没有找到 default，则获取第一个主题文件为初始化主题
 * 
 * @param {string} names 文件名（无后缀）列表
 */
export const getDefaultThemes = (names: string[]) => {
  const isExist = names.some(name => name === 'default');
  return {
    isExist,
    defaultName: isExist ? 'default' : names[0]
  };
};

/**
 * themes 文件夹不存在 or 不存在样式文件，则视为不启动主题配置
 * 
 * @param {string} themesPath 主题目录路径
 */
export const getEnableThemes = async (themesPath: string): Promise<boolean> => {
  const dirExists = await pathExists(themesPath);
  if (!dirExists) return false;

  const files = await readdir(themesPath);
  if (files.length === 0) return false;

  const stylesExists = files.some(detectCssFile(themesPath));
  if (!stylesExists) return false;

  return true;
};

/**
 * 将某段 TS 代码中的 export type keyword 的类型重定义为联合类型
 * 
 * eg: export type keyword = any -> export type keyword = '233' | '666'
 * 
 * @param {string} keyword 类型名称
 * @param {string[]} unit 联合类型数组
 * @param {string} source 需要进行替换的 TS 代码
 * 
 * @return {string} 导出 TS 代码文本
 */
export const transformType = (keyword: string, unit: string[], source: string): string => {
  // TS -> AST
  const root: ts.SourceFile = ts.createSourceFile(
    'type', source, ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS
  );

  // 定义转换器
  const transformer: ts.TransformerFactory<ts.SourceFile> = (context: ts.TransformationContext) => (sourceFile: ts.SourceFile) => {
    const visitor = (node: ts.Node): ts.Node => {
      if (ts.isTypeAliasDeclaration(node) && node.name.escapedText === keyword) {
        const nodeList = unit.map(text => ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(text)));
        const unionTypes = ts.factory.createUnionTypeNode(nodeList);

        return ts.factory.createTypeAliasDeclaration(
          undefined,
          [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          ts.factory.createIdentifier(keyword),
          undefined,
          unionTypes
        );
      }

      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor);
  };

  const printer: ts.Printer = ts.createPrinter();
  // AST -> TS
  const result: ts.TransformationResult<ts.SourceFile> = ts.transform(
    root, [transformer]
  );
  const transformedSourceFile: ts.SourceFile = result.transformed[0];

  return printer.printFile(transformedSourceFile);
};