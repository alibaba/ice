// Credit: react-dev-inspector 1.1.4 (c) https://github.com/zthxxx
// <https://github.com/zthxxx/react-dev-inspector/blob/master/src/plugins/webpack/inspector-loader.ts>

import * as path from 'path';
import { getOptions } from 'loader-utils';
import { parse } from '@babel/parser';
import generate from '@babel/generator';
import traverse, { NodePath } from '@babel/traverse';
import {
  jsxAttribute,
  jsxIdentifier,
  stringLiteral,
  Node,
  JSXOpeningElement,
  JSXIdentifier,
  JSXMemberExpression,
  JSXNamespacedName,
  JSXAttribute,
} from '@babel/types';

const isNil = (value: any): value is null | undefined => value === null || value === undefined;

type NodeHandler<T = Node, O = void> = (node: T, option: O) => {
  /**
   * stop processing flag
   */
  stop?: boolean;

  /**
   * throw error
   */
  error?: any;

  /**
   * node after processing
   */
  result?: Node;
};

const doJSXIdentifierName: NodeHandler<JSXIdentifier> = (name) => {
  if (name.name.endsWith('Fragment')) {
    return { stop: true };
  }
  return { stop: false };
};

const doJSXMemberExpressionName: NodeHandler<JSXMemberExpression> = (name) => {
  return doJSXIdentifierName(name.property);
};

const doJSXNamespacedNameName: NodeHandler<JSXNamespacedName> = (name) => {
  return doJSXIdentifierName(name.name);
};

type ElementTypes = JSXOpeningElement['name']['type'];

const doJSXPathName: NodeHandler<JSXOpeningElement['name']> = (name) => {
  const dealMap: { [key in ElementTypes]: NodeHandler } = {
    JSXIdentifier: doJSXIdentifierName,
    JSXMemberExpression: doJSXMemberExpressionName,
    JSXNamespacedName: doJSXNamespacedNameName,
  };

  return dealMap[name.type](name);
};

const doJSXOpeningElement: NodeHandler<
JSXOpeningElement,
{ relativePath: string }
> = (node, option) => {
  const { stop } = doJSXPathName(node.name);
  if (stop) return { stop };

  const { relativePath } = option;
  const line = node.loc?.start.line;
  const column = node.loc?.start.column;

  const lineAttr: JSXAttribute | null = isNil(line)
    ? null
    : jsxAttribute(
      jsxIdentifier('data-inspector-line'),
      stringLiteral(line.toString()),
    );

  const columnAttr: JSXAttribute | null = isNil(column)
    ? null
    : jsxAttribute(
      jsxIdentifier('data-inspector-column'),
      stringLiteral(column.toString()),
    );

  const relativePathAttr: JSXAttribute = jsxAttribute(
    jsxIdentifier('data-inspector-relative-path'),
    stringLiteral(relativePath),
  );

  const attributes = [lineAttr, columnAttr, relativePathAttr] as JSXAttribute[];

  // Make sure that there are exist together
  if (attributes.every(Boolean)) {
    node.attributes.push(...attributes);
  }

  return { result: node };
};

/**
 * simple path match method, only use string and regex
 */
export const pathMatch = (filePath: string, matches?: (string | RegExp)[]): boolean => {
  if (!matches?.length) return false;

  return matches.some((match) => {
    if (typeof match === 'string') {
      return filePath.includes(match);
    } else if (match instanceof RegExp) {
      return match.test(filePath);
    }
    // default is do not filter when match is illegal, so return true
    return true;
  });
};

/**
 * [webpack compile time]
 *
 * inject line, column, relative-path to JSX html data attribute in source code
 *
 * @type webpack.loader.Loader
 * ref: https://astexplorer.net  +  @babel/parser
 */
export default function inspectorLoader(this: any, source: string) {
  const {
    rootContext: rootPath,
    resourcePath: filePath,
  } = this;

  /**
   * example:
   * rootPath: /home/xxx/project
   * filePath: /home/xxx/project/src/ooo/xxx.js
   * relativePath: src/ooo/xxx.js
   */
  const relativePath = path.relative(rootPath, filePath);

  const options: any = getOptions(this);

  const isSkip = pathMatch(filePath, options.exclude);
  if (isSkip) {
    return source;
  }

  const ast: Node = parse(source, {
    sourceType: 'module',
    allowUndeclaredExports: true,
    allowImportExportEverywhere: true,
    plugins: [
      'typescript',
      'jsx',
      'decorators-legacy',
      'classProperties',
      ...options?.babelPlugins ?? [],
    ],
    ...options?.babelOptions,
  });

  /**
   * astexplorer + @babel/parser
   * https://astexplorer.net
   */
  traverse(ast, {
    enter(nodePath: NodePath<Node>) {
      if (nodePath.type === 'JSXOpeningElement') {
        doJSXOpeningElement(
          nodePath.node as JSXOpeningElement,
          { relativePath },
        );
      }
    },
  });

  const {
    code,
  } = generate(ast, {
    decoratorsBeforeExport: true,
  });

  return code;
}
