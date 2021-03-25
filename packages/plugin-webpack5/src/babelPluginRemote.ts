import * as t from '@babel/types';
import type { NodePath } from '@babel/traverse';

type ILibs = (string|RegExp)[];
interface IOpts {
  libs: ILibs,
  remoteName: string;
}
type IMatchNode = NodePath<t.ImportDeclaration> | NodePath<t.ExportNamedDeclaration> | NodePath<t.ExportAllDeclaration>
const isMatchRemote = (source: string, libs: ILibs) => {
  return libs.some((lib) => {
    if (typeof lib === 'string') {
      return lib === source;
    } else {
      return lib.test(source);
    }
  });
};

const modifyDeclarationSource = (nodePath: IMatchNode, { libs, remoteName }) => {
  const { node } = nodePath;
  if (node.source) {
    const source = node.source.value;
    if (node.source && isMatchRemote(node.source.value, libs)) {
      node.source = t.stringLiteral(`${remoteName}/${source}`);
    }
  }
};

export default (babel, opts: IOpts) => {
  return {
    visitor: {
      ImportDeclaration(nodePath: NodePath<t.ImportDeclaration>) {
        modifyDeclarationSource(nodePath, opts);
      },
      ExportNamedDeclaration(nodePath: NodePath<t.ExportNamedDeclaration>) {
        modifyDeclarationSource(nodePath, opts);
      },
      ExportAllDeclaration(nodePath: NodePath<t.ExportAllDeclaration>) {
        modifyDeclarationSource(nodePath, opts);
      },
      CallExpression(nodePath: NodePath<t.CallExpression>) {
        const { node } = nodePath;
        const { libs, remoteName } = opts;
        if (t.isImport(node.callee)) {
          const source = (node.arguments[0] as t.StringLiteral).value;
          if (isMatchRemote(source, libs)) {
            node.arguments[0] = t.stringLiteral(`${remoteName}/${source}`);
          }
        }
      }
    }
  };
};
