import type { Compiler } from 'webpack';
import babelParser from '@babel/parser';
import traverse from '@babel/traverse';
import MagicString from '@ice/bundles/compiled/magic-string/index.js';
import webpack from 'webpack';

const { RuntimeGlobals } = webpack;

const PLUGIN_NAME = 'modify_require';
// @ts-ignore
const babelTraverse = traverse.default;

class ModifyRequirePlugin {
  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: PLUGIN_NAME,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        (assets) => {
          const mainChunkNames = [];

          for (const chunk of compilation.chunks) {
            if (chunk.hasRuntime() && !chunk.name.includes('.fallback')) {
              mainChunkNames.push(chunk.name);
            }
          }
          Object.entries(assets).forEach(([pathname, source]) => {
            let sourceCode = source.source().toString();
            if (mainChunkNames.some((chunkName) => pathname.includes(`${chunkName}.cjs`))) {
              const ast = babelParser.parse(sourceCode);
              const magicString = new MagicString(sourceCode);
              babelTraverse(ast, {
                AssignmentExpression(path) {
                  const left = sourceCode.slice(path.node.left.start, path.node.left.end);
                  if (left === RuntimeGlobals.createFakeNamespaceObject) {
                    magicString.overwrite(
                      path.node.right.start,
                      path.node.right.end,
                      `
                      function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' && !~leafPrototypes.indexOf(current)) || typeof current == 'function'; current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		}; `,
                    );
                  }
                },
                FunctionDeclaration: function (path) {
                  if (path.node.id.name === '__webpack_require__') {
                    const { start, end } = path.node;
                    // __webpack_require_declaration = sourceCode.slice(start, end);
                    magicString.overwrite(
                      start,
                      end,
                      `function __webpack_require__(moduleId) {
  // 检查模块是否在缓存中
  var cachedModule = __webpack_require__.c[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  if (__webpack_require__.m[moduleId]) {
  // 创建一个新模块（并将其放入缓存中）
  var module = __webpack_require__.c[moduleId] = {
    id: moduleId,
    loaded: false,
    exports: {}
  };  // 执行模块函数
    try { __webpack_require__.m[moduleId].call(module.exports, module, module.exports, __webpack_require__); module.loaded = true; } catch (err) {
  delete __webpack_require__.c[moduleId]; throw err;}
  // 返回模块的导出
  return module.exports;
 }

else { throw new Error("Module " + moduleId + " not found"); }
}`,
                    );
                  }
                },
              });
              compilation.updateAsset(
                pathname,
                new compiler.webpack.sources.SourceMapSource(
                  magicString.toString(),
                  pathname,
                  // TODO: real sourcemap
                  source.map(),
                ),
              );
            }
          });
        },
      );
    });
  }
}

export default ModifyRequirePlugin;
