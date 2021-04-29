import * as t from '@babel/types';

const mountStatement = `
  export function mount(ModuleComponent, targetNode, props) {
    ReactDOM.render(React.createElement(ModuleComponent, Object.assign({}, props)), targetNode);
  }
  `;
const unmountStatement = `
  export function unmount(targetNode) {
    ReactDOM.unmountComponentAtNode(targetNode);
  }
`;

export default (api: any, { entries }: { entries: string[] }) => {
  const checkEntryPoint = (filename: string) => {
    return entries.some(entry => filename.includes(entry));
  };

  return {
    visitor: {
      Program(nodePath: any, state: any) {
        if (checkEntryPoint(state.filename)) {
          const node: t.Program = nodePath.node;
          const { body } = node;

          let reactdomStatement = false;
          let mountExportStatement = false;
          let unmountExportStatement = false;

          body.forEach((item) => {
            if (t.isImportDeclaration(item)) {
  
              if (t.isStringLiteral(item.source, { value: 'react-dom' })) {
                // 代码 import 了 'react-dom'
                reactdomStatement = true;
                // 判断 ReactDOM 是否通过 import ReactDOM from 'react-dom' 的方式引入, 可能的方式有
                // import { render } from 'react-dom';
                // import ReactDOM, { render } from 'react-dom';
                const reactDomDefaultExport = item.specifiers.some(value => {
                  // 有默认导入 default ReactDOM
                  return t.isImportDefaultSpecifier(value) && t.isIdentifier(value.local, { name: 'ReactDOM' });
                });
  
                // 如果没有默认导入 ReactDOM，则添加一个 default 导入
                if (!reactDomDefaultExport) {
                  item.specifiers.push(t.importDefaultSpecifier(t.identifier('ReactDOM')));
                }

              }
            }
  
            // 遍历非 defalut 导出函数，判断是否有 unmount 和 mount 导出
            if (t.isExportNamedDeclaration(item)) {
              // 如果是 export function mount() {} 这种形式
              const isFuntionDec = (name: string) => t.isFunctionDeclaration(item.declaration) && t.isIdentifier(item.declaration.id, { name });
              // 如果是 export const mount = () => {}  这种形式
              const isVariableDec = (name: string) => t.isVariableDeclaration(item.declaration) && t.isIdentifier(item.declaration.declarations[0], { name });
  
              if (isFuntionDec('mount') || isVariableDec('mount')) {
                mountExportStatement = true;
              }
  
              if (isFuntionDec('unmount') || isVariableDec('unmount')) {
                unmountExportStatement = true;
              }
            }
          });

          // append react-dom
          if (!reactdomStatement) {
            body.push(
              t.importDeclaration([
                t.importDefaultSpecifier(t.identifier('ReactDOM')),
              ], t.stringLiteral('react-dom'))
            );
          }

          // append `mount` and `unmount`
          if (!mountExportStatement || !unmountExportStatement) {
            if (!mountExportStatement && !unmountExportStatement) {
              nodePath.pushContainer('body', api.template(`${mountStatement} \n ${unmountStatement}`)());
            } else if (!mountExportStatement) {
              nodePath.pushContainer('body', api.template(mountStatement)());
            } else {
              nodePath.pushContainer('body', api.template(unmountStatement)());
            }
          }
        }

      }
    }
  };
};