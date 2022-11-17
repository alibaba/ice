import type webpack from '@ice/bundles/compiled/webpack/index.js';
import * as walk from 'acorn-walk';
import SingleEntryDependency from '../dependencies/SingleEntryDependency.js';
import { componentConfig } from '../template/component.js';
import onParseCreateElement from '../../html/index.js';
import NormalModule, { registerSerialization } from './NormalModule.js';


const PLUGIN_NAME = 'NormalModulesPlugin';

export default class NormalModulesPlugin {
  constructor() {
    registerSerialization();
  }
  apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (_, { normalModuleFactory }) => {
      normalModuleFactory.hooks.createModule.tapPromise(PLUGIN_NAME, (data, { dependencies }) => {
        const dependency = dependencies[0];
        if (dependency instanceof SingleEntryDependency) {
          return Promise.resolve(new NormalModule(Object.assign(data,
            { miniType: dependency.miniType, name: dependency.name },
          )));
        }
        return Promise.resolve();
      });

      // react 的第三方组件支持
      normalModuleFactory.hooks.parser.for('javascript/auto').tap(PLUGIN_NAME, (parser) => {
        parser.hooks.program.tap(PLUGIN_NAME, (ast) => {
          walk.simple(ast, {
            CallExpression: node => {
              // @ts-ignore
              const { callee } = node;
              if (callee.type === 'MemberExpression') {
                if (callee.property.name !== 'createElement') {
                  return;
                }
              } else {
                // 兼容 react17 new jsx transtrom
                if (callee.name !== '_jsx' && callee.name !== '_jsxs') {
                  return;
                }
              }

              // @ts-ignore
              const [type, prop] = node.arguments;
              const componentName = type.name;

              onParseCreateElement({ nodeName: type.value, componentConfig });

              if (componentName === 'CustomWrapper' && !componentConfig.thirdPartyComponents.get('custom-wrapper')) {
                componentConfig.thirdPartyComponents.set('custom-wrapper', new Set());
              }
              if (componentConfig.thirdPartyComponents.size === 0) {
                return;
              }
              const attrs = componentConfig.thirdPartyComponents.get(type.value);

              if (attrs == null || !prop || prop.type !== 'ObjectExpression') {
                return;
              }

              prop.properties
                .filter(p => p.type === 'Property' && p.key.type === 'Identifier' && p.key.name !== 'children')
                .forEach(p => attrs.add(p.key.name));
            },
          });
        });
      });
    });
  }
}
