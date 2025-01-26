import { type Compiler } from 'webpack';
import babelParser from '@babel/parser';
import traverse from '@babel/traverse';
import MagicString from '@ice/bundles/compiled/magic-string/index.js';

const PLUGIN_NAME = 'modify_require';
// @ts-ignore
const babelTraverse = traverse.default;

class ModifyRequirePlugin {
  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      let __webpack_require_declaration;
      let __webpack_module_cache__;
      let webpackRuntimeChunk = new MagicString('');
      compilation.hooks.processAssets.tap(
        {
          name: PLUGIN_NAME,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        (assets) => {
          // TODO: make it more universal
          Object.entries(assets).forEach(([pathname, source]) => {
            let sourceCode = source.source().toString();
            // TODO: 判断入口文件名
            if (pathname.includes('home.cjs')) {
              const ast = babelParser.parse(sourceCode);
              const magicString = new MagicString(sourceCode);

              let webpackRuntimeChunkStIndex;
              let webpackRuntimeChunkEndIndex;
              babelTraverse(ast, {
                CallExpression(path) {
                  if (
                    path.node.callee.type === 'ArrowFunctionExpression' &&
                    path.node.callee.body &&
                    path.node.callee.body.body &&
                    path.node.callee.body.body[0].type === 'ExpressionStatement' &&
                    path.node.callee.body.body[0].expression.type === 'AssignmentExpression'
                  ) {
                    const assignmentExpression = path.node.callee.body.body[0].expression;
                    const { start, end } = assignmentExpression.left;
                    const left = sourceCode.slice(start, end);
                    if (left === '__webpack_require__.r') {
                      webpackRuntimeChunkEndIndex = path.node.end;
                    }
                  }
                },
                FunctionDeclaration: function (path) {
                  if (path.node.id.name === '__webpack_require__') {
                    const { start, end } = path.node;
                    // __webpack_require_declaration = sourceCode.slice(start, end);
                  }
                },
                VariableDeclaration(path) {
                  if (path.node.kind === 'var' && path.node.declarations[0].id.name === '__webpack_module_cache__') {
                    // __webpack_module_cache__ = sourceCode.slice(path.node.start, path.node.end);
                    webpackRuntimeChunkStIndex = path.node.start;
                    // magicString.overwrite(
                    //   path.node.start,
                    //   path.node.end,
                    //   'var __webpack_module_cache__ =  window.__quickMode.__webpack_module_cache__',
                    // );
                  }
                },
              });
              if (webpackRuntimeChunkStIndex && webpackRuntimeChunkEndIndex) {
                webpackRuntimeChunk.append(
                  `${sourceCode.slice(webpackRuntimeChunkStIndex, webpackRuntimeChunkEndIndex)}`,
                );
                magicString.overwrite(
                  webpackRuntimeChunkStIndex,
                  webpackRuntimeChunkEndIndex,
                  // TODO: use es5 syntax
                  `var __webpack_require__ =  window.__quickMode.__webpack_require__;
                      __webpack_require__.m = {...__webpack_modules__, ...__webpack_require__.m}`,
                );
              }
              // 移除 installChunk
              compilation.updateAsset(
                pathname,
                new compiler.webpack.sources.SourceMapSource(
                  // require is not work in wormhole, so store the module chunk in window instead
                  // sourceCode.replace(/installChunk\(.+\)/, 'installChunk(window.__quickMode)'),
                  magicString.toString().replace(/installChunk\(.+\)/, 'installChunk(window.__quickMode)'),

                  pathname,
                  // TODO: real sourcemap
                  source.map(),
                ),
              );
            } else if (pathname.includes('vendor')) {
              let code = sourceCode
                .replace(/exports\.id/, 'const __quickMode = {} \n__quickMode.id')
                .replace(/exports\.ids/, '__quickMode.ids')
                .replace(/exports\.modules/, 'const __webpack_modules__')
                .replace(
                  'const { Writable } = stream_browserify_namespaceObject;',
                  'const { Writable } = stream_browserify;',
                );
              code += `\n${webpackRuntimeChunk.toString()}`;
              code += `\nmodule.exports = function () {
                __quickMode.__webpack_require__ = __webpack_require__;
  window.__quickMode = __quickMode;
  Object.keys(__webpack_modules__).forEach(id => {
    __webpack_require__(id)
  });
}`;

              const ast = babelParser.parse(code);
              const vendorMagicString = new MagicString(code);
              babelTraverse(ast, {
                FunctionDeclaration: function (path) {
                  if (path.node.id.name === '__webpack_require__') {
                    const { start, end } = path.node;
                    // __webpack_require_declaration = sourceCode.slice(start, end);
                    vendorMagicString.overwrite(
                      start,
                      end,
                      `function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	

/******/ 		// Execute the module function
            try{
              
              /******/ 		__webpack_require__.m[moduleId].call(module.exports, module, module.exports, __webpack_require__);
              /******/ 		module.loaded = true;
              /******/ 		return module.exports;
            }catch(e){
              console.log( Object.keys(__webpack_require__.m).length,'fail to load moduleId:', moduleId, 'reason is', e.message,)
            }
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 	
/******/ 		// Return the exports of the module
/******/ 	}`,
                    );
                  }
                },
              });

              compilation.updateAsset(
                pathname,
                new compiler.webpack.sources.SourceMapSource(
                  // require is not work in wormhole, so store the module chunk in window instead
                  vendorMagicString.toString(),
                  pathname,
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
