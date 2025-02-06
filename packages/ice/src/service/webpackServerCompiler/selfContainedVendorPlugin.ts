import * as path from 'path';
import webpack from 'webpack';
import ReadFileChunkLoadingRuntimeModule from 'webpack/lib/node/ReadFileChunkLoadingRuntimeModule.js';
import EnableChunkLoadingPlugin from 'webpack/lib/javascript/EnableChunkLoadingPlugin.js';
import StartupHelpers from 'webpack/lib/javascript/StartupHelpers.js';
import type { Compiler, Chunk, ChunkGraph, Compilation, Module } from 'webpack';

const { RuntimeGlobals, javascript, Template } = webpack;

class SelfContainedVendorPlugin {
  constructor(private options = {}) {}

  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap('SelfContainedVendorPlugin', (compilation) => {
      // compilation.hooks.processAssets.tap(
      //   {
      //     name: 'CustomBundlePlugin',
      //     // stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER
      //     stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
      //   },
      //   (assets) => this.processChunks(compilation, assets),
      // );

      // JavascriptModulesPlugin.getCompilationHooks(compilation).renderMain.tap(
      //   'CustomBundlePlugin',
      //   (source, { chunk, chunkGraph, runtimeTemplate, moduleGraph }) => {
      //     return this.generateMainChunkOutput(chunk, compilation);
      //   },
      // );

      // compilation.hooks.runtimeRequirementInTree
      //   .for(RuntimeGlobals.ensureChunkHandlers)
      //   .tap('CustomRuntimePlugin', (chunk, set) => {
      //     set.add(RuntimeGlobals.hasOwnProperty);
      //     set.add(RuntimeGlobals.moduleFactoriesAddOnly);
      //     compilation.addRuntimeModule(
      //       chunk,
      //       new ReadFileChunkLoadingRuntimeModule(set),
      //     );
      //   });
      javascript.JavascriptModulesPlugin.getCompilationHooks(compilation).renderChunk.tap(
        'CustomBundlePlugin',
        (source, { chunk, chunkGraph, runtimeTemplate, moduleGraph }) => {
          // 只处理 vendor
          if (chunk.name?.includes('.vendor')) {
            return this.generateAsyncChunkOutput(chunk, compilation);
          }
        },
      );
    });

    // 分析 chunk 间依赖
    // compiler.hooks.afterCompile.tap(
    //   'ChunkDependencyAnalyzerPlugin',
    //   (compilation) => {
    //     const { chunkGraph } = compilation;

    //     // 用于存储 chunk 依赖关系的 Map
    //     const chunkDependencies = new Map();

    //     // 遍历所有 chunks
    //     for (const chunk of compilation.chunks) {
    //       if (!chunkDependencies.has(chunk)) {
    //         chunkDependencies.set(chunk, new Set());
    //       }

    //       // 分析 ChunkGroup 关系
    //       this.analyzeChunkGroupRelations(chunk, chunkDependencies);

    //       // 分析模块依赖
    //       this.analyzeModuleDependencies(
    //         chunk,
    //         chunkGraph,
    //         compilation.moduleGraph,
    //         chunkDependencies,
    //       );
    //     }

    //     // 输出依赖关系
    //     this.printDependencies(chunkDependencies);
    //   },
    // );
  }

  processChunks(compilation, assets) {
    const mainChunks = [];
    const asyncChunks = [];

    for (const chunk of compilation.chunks) {
      if (chunk.hasRuntime()) {
        mainChunks.push(chunk);
      } else {
        asyncChunks.push(chunk);
      }
    }

    // 处理主 chunk
    for (const chunk of mainChunks) {
      const filename = compilation.getPath(chunk.filenameTemplate || compilation.outputOptions.filename, { chunk });
      const source = this.generateMainChunkOutput(chunk, compilation, asyncChunks);
      assets[filename] = new webpack.sources.RawSource(source);
    }

    // 处理异步 chunks
    for (const chunk of asyncChunks) {
      const filename = compilation.getPath(chunk.filenameTemplate || compilation.outputOptions.chunkFilename, {
        chunk,
      });
      const source = this.generateAsyncChunkOutput(chunk, compilation);
      assets[filename] = source;
    }
  }

  getRuntimeChunks(compilation: Compilation): Chunk[] {
    return Array.from(compilation.chunks).filter((chunk) => chunk.hasRuntime());
  }

  generateMainChunkOutput(chunk, compilation, asyncChunks) {
    const { chunkGraph } = compilation;
    const modules = this.getModulesFromChunk(chunk, chunkGraph, compilation);

    let output = '';
    output += 'const __webpack_modules__ = {};\n\n';
    output += 'const __webpack_module_cache__ = {};\n\n';

    // 添加 __webpack_require__ 函数
    output += this.generateWebpackRequire(compilation, chunk);

    // 添加异步加载逻辑
    output += this.generateAsyncLoadingLogic();

    // 添加模块代码
    for (const [id, { source, module }] of Object.entries(modules)) {
      const exports = module.type === 'javascript/esm' ? RuntimeGlobals.exports : 'exports';
      if (source) {
        output += `__webpack_modules__[${JSON.stringify(id)}] = function(module, ${exports}, ${
          RuntimeGlobals.require
        }) {\n`;
        output += `  ${source}\n`;
        output += '};\n\n';
      } else {
        console.warn(`No valid source for module ${id}`);
        output += `__webpack_modules__[${JSON.stringify(id)}] = function(module, ${exports}, ${
          RuntimeGlobals.require
        }) { throw new Error("No valid source"); };\n\n`;
      }
    }

    // 启动应用
    const entryModules = Array.from(chunkGraph.getChunkEntryModulesIterable(chunk));
    const initialChunkIds = StartupHelpers.getInitialChunkIds(chunk, chunkGraph, javascript.JavascriptModulesPlugin.chunkHasJs);
    const initialChunkIdsArr = Array.from(initialChunkIds);
    for (const entryModule of entryModules) {
      const entryModuleId = chunkGraph.getModuleId(entryModule);
      output += '// 入口模块\n';
      output += `exports.getInstance = async function getInstance() {
        await ${RuntimeGlobals.ensureChunk}(${initialChunkIdsArr[0]});
        return ${RuntimeGlobals.require}(${JSON.stringify(entryModuleId)});
      }\n`;
    }

    return output;
  }

  generateAsyncChunkOutput(chunk: Chunk, compilation: Compilation): webpack.sources.RawSource {
    const { chunkGraph } = compilation;
    const modules = this.getModulesFromChunk(chunk, chunkGraph, compilation);

    let output = '(function () {\n';
    output += 'const __QUICK__ = {}; \n';
    output += '__QUICK__.__webpack_modules__ = {};\n';
    output += '__QUICK__.__webpack_modules_cache__ = {};\n';
    output += 'const __webpack_modules__ = __QUICK__.__webpack_modules__;\n\n';
    output += 'const __webpack_module_cache__ = __QUICK__.__webpack_modules_cache__;\n\n';

    // 添加 __webpack_require__ 函数
    // output += this.generateWebpackRequire(compilation, chunk);

    for (const [id, { source, module }] of Object.entries(modules)) {
      if (source) {
        output += `__webpack_modules__[${JSON.stringify(id)}] = function(${RuntimeGlobals.module}, ${
          module.exportsArgument
        }, ${RuntimeGlobals.require}) {\n`;
        output += `  ${source}\n`;
        output += '};\n\n';
      }
    }

    // output += `
    //     let failedCount = 0;
    //     Object.keys(${RuntimeGlobals.moduleFactories}).forEach(id => {
    //     try {
    //     ${RuntimeGlobals.require}(id);
    //     } catch (e) {
    //       delete ${RuntimeGlobals.moduleCache}[id];
    //       failedCount++;
    //     }
    //     });
    //     console.log('prerequired modules', Object.keys(__webpack_modules__).length, 'failed', failedCount);
    //     \n`;

    output += 'return { __webpack_modules__, __webpack_module_cache__ } ; })()\n';

    output += `

    exports.runtime = function (${RuntimeGlobals.require}) {
  const originalM = { ...${RuntimeGlobals.moduleFactories} };
  Object.keys(${RuntimeGlobals.moduleFactories}).forEach(id => {
    delete ${RuntimeGlobals.moduleFactories}[id];
  });
  Object.keys(exports.modules.__webpack_modules__).forEach(id => {
    ${RuntimeGlobals.moduleFactories}[id] = exports.modules.__webpack_modules__[id];
  });
  if (Object.keys(exports.modules.__webpack_module_cache__).length === 0) {
      let failedCount = 0;
    Object.keys(exports.modules.__webpack_modules__).forEach(id => {
    try {
    ${RuntimeGlobals.require}(id);
    } catch (e) {
      delete ${RuntimeGlobals.moduleCache}[id];
      failedCount++;
    }
    });
      console.info && console.info('prerequired modules', Object.keys(exports.modules.__webpack_modules__).length, 'failed', failedCount);
     Object.assign(exports.modules.__webpack_module_cache__, ${RuntimeGlobals.moduleCache});
  } else {
    Object.assign(${RuntimeGlobals.moduleCache}, exports.modules.__webpack_module_cache__);
    console.info && console.info('reuse cached modules', Object.keys(${RuntimeGlobals.moduleCache}).length);
  }

  // 还原
  Object.keys(originalM).forEach(id => {
    ${RuntimeGlobals.moduleFactories}[id] = originalM[id];
  });
}
    `;

    return new webpack.sources.RawSource(output);
  }

  getModulesFromChunk(chunk: Chunk, chunkGraph: ChunkGraph, compilation: Compilation) {
    const modules: Record<
      string,
      {
        source: string | Buffer;
        module: Module;
      }
    > = {};
    for (const module of chunkGraph.getChunkModulesIterable(chunk)) {
      const id = chunkGraph.getModuleId(module);
      const source = this.getModuleSource(module, chunk, compilation);
      modules[id] = {
        source,
        module,
      };
    }
    return modules;
  }

  getModuleSource(module: Module, chunk: Chunk, compilation: Compilation) {
    const { codeGenerationResults } = compilation;
    const moduleSource = codeGenerationResults.get(module, chunk.runtime).sources.get('javascript');
    return moduleSource ? moduleSource.source() : null;
  }

  generateWebpackRequire(compilation: Compilation, chunk: Chunk) {
    const { runtimeTemplate } = compilation;

    let output = '';
    output += `function ${RuntimeGlobals.require}(moduleId) {\n`;
    output += '  // 检查模块是否在缓存中\n';
    output += `  var cachedModule = ${RuntimeGlobals.moduleCache}[moduleId];\n`;
    output += '  if (cachedModule !== undefined) {\n';
    output += '    return cachedModule.exports;\n';
    output += '  }\n';
    output += `  if (${RuntimeGlobals.moduleFactories}[moduleId]) { \n`;
    output += '  // 创建一个新模块（并将其放入缓存中）\n';
    output += `  var module = ${RuntimeGlobals.moduleCache}[moduleId] = {\n`;
    output += '    exports: {}\n';
    output += '  };';
    output += '  // 执行模块函数\n';
    output += `  try { ${RuntimeGlobals.moduleFactories}[moduleId](module, module.exports, ${RuntimeGlobals.require}); } catch (err) {\n`;
    output += `  delete ${RuntimeGlobals.moduleCache}[moduleId]; throw err;}\n`;
    output += '  // 返回模块的导出\n';
    output += '  return module.exports;\n';
    output += ' }\n\n';
    output += 'else { throw new Error("Module " + moduleId + " not found"); } \n';
    output += '}\n\n';

    // 添加 __webpack_require__.m
    output += `${RuntimeGlobals.moduleFactories} = __webpack_modules__;\n\n`;

    // 添加 __webpack_require__.d
    output += `${RuntimeGlobals.definePropertyGetters} = function(exports, definition) {\n`;
    output += '  for(var key in definition) {\n';
    output += `    if(${RuntimeGlobals.hasOwnProperty}(definition, key) && !${RuntimeGlobals.hasOwnProperty}(exports, key)) {\n`;
    output += '      Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });\n';
    output += '    }\n';
    output += '  }\n';
    output += '};\n\n';

    // 添加 __webpack_require__.o
    output += `${RuntimeGlobals.hasOwnProperty} = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }\n\n`;

    // 添加 __webpack_require__.r
    output += `${RuntimeGlobals.makeNamespaceObject} = function(exports) {\n`;
    output += '  if(typeof Symbol !== "undefined" && Symbol.toStringTag) {\n';
    output += '    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });\n';
    output += '  }\n';
    output += '  Object.defineProperty(exports, "__esModule", { value: true });\n';
    output += '};\n\n';

    // 添加 __webpack_require__.t
    output += Template.asString([
			`var getProto = Object.getPrototypeOf ? ${runtimeTemplate.returningFunction(
				'Object.getPrototypeOf(obj)',
				'obj',
			)} : ${runtimeTemplate.returningFunction('obj.__proto__', 'obj')};`,
			'var leafPrototypes;',
			'// create a fake namespace object',
			'// mode & 1: value is a module id, require it',
			'// mode & 2: merge all properties of value into the ns',
			'// mode & 4: return value when already ns object',
			"// mode & 16: return value when it's Promise-like",
			'// mode & 8|1: behave like require',
			// Note: must be a function (not arrow), because this is used in body!
			`${RuntimeGlobals.createFakeNamespaceObject} = function(value, mode) {`,
			Template.indent([
				'if(mode & 1) value = this(value);',
				'if(mode & 8) return value;',
				"if(typeof value === 'object' && value) {",
				Template.indent([
					'if((mode & 4) && value.__esModule) return value;',
					"if((mode & 16) && typeof value.then === 'function') return value;",
				]),
				'}',
				'var ns = Object.create(null);',
				`${RuntimeGlobals.makeNamespaceObject}(ns);`,
				'var def = {};',
				'leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];',
				"for(var current = mode & 2 && value; (typeof current == 'object' && !~leafPrototypes.indexOf(current)) || typeof current == 'function'; current = getProto(current)) {",
				Template.indent([
					`Object.getOwnPropertyNames(current).forEach(${runtimeTemplate.expressionFunction(
						`def[key] = ${runtimeTemplate.returningFunction('value[key]', '')}`,
						'key',
					)});`,
				]),
				'}',
				`def['default'] = ${runtimeTemplate.returningFunction('value', '')};`,
				`${RuntimeGlobals.definePropertyGetters}(ns, def);`,
				'return ns;',
			]),
			'};\n',
		]);

    // 添加 __webpack_require__.n
    output += `${RuntimeGlobals.compatGetDefaultExport} = function(module) {\n`;
    output += '  var getter = module && module.__esModule ?\n';
    output += '    function getDefault() { return module["default"]; } :\n';
    output += '    function getModuleExports() { return module; };\n';
    output += `  ${RuntimeGlobals.definePropertyGetters}(getter, { a: getter });\n`;
    output += '  return getter;\n';
    output += '};\n\n';

    output += `${RuntimeGlobals.moduleFactories} = __webpack_modules__;\n`;
    output += `${RuntimeGlobals.moduleCache} = __webpack_module_cache__;\n`;

    const runtimeChunks = this.getRuntimeChunks(compilation);
    let runtimeId;
    for (const runtimeChunk of runtimeChunks) {
      if (chunk.name.startsWith(runtimeChunk.name)) {
        if (typeof runtimeChunk.runtime === 'string') {
          runtimeId = compilation.chunkGraph.getRuntimeId(runtimeChunk.runtime);
        } else {
          throw new Error('runtimeChunk.runtime is not a string');
        }
      }
    }
    if (!runtimeId) {
      throw new Error('runtimeId is not found');
    }
    // 添加 __webpack_require__.j
    output += `${RuntimeGlobals.runtimeId} = ${JSON.stringify(runtimeId)};`;

    // 添加 __webpack_require__.nmd
    output += Template.asString([
      `${RuntimeGlobals.nodeModuleDecorator} = ${runtimeTemplate.basicFunction('module', [
        'module.paths = [];',
        'if (!module.children) module.children = [];',
        'return module;',
      ])};`,
    ]);

    return output;
  }

  generateAsyncLoadingLogic() {
    let output = '';
    output += `${RuntimeGlobals.ensureChunk} = function(chunkId) {\n`;
    output += '  return new Promise(function(resolve, reject) {\n';
    output += '    try {\n';
    output += `      let chunkModules = require(require.resolve("./" + ${RuntimeGlobals.getChunkScriptFilename}(chunkId)));\n`;
    output += '      chunkModules = chunkModules.modules();\n';
    output += '      Object.keys(chunkModules).forEach(function(moduleId) {\n';
    output += '        __webpack_modules__[moduleId] = chunkModules[moduleId];\n';
    output += '      });\n';
    output += '      resolve();\n';
    output += '    } catch(e) {\n';
    output += '      reject(e);\n';
    output += '    }\n';
    output += '  });\n';
    output += '};\n\n';

    output += `${RuntimeGlobals.getChunkScriptFilename} = function(chunkId) {\n`;
    output += `  return ${JSON.stringify('TODO')}.replace("[id]", chunkId);\n`;
    output += '};\n\n';

    return output;
  }

  analyzeChunkGroupRelations(chunk, chunkDependencies) {
    const queue = [...chunk.groupsIterable];
    const visited = new Set();

    while (queue.length) {
      const group = queue.shift();
      if (visited.has(group)) continue;
      visited.add(group);

      for (const parentGroup of group.parentsIterable) {
        for (const parentChunk of parentGroup.chunks) {
          if (parentChunk !== chunk) {
            chunkDependencies.get(parentChunk).add(chunk);
          }
        }
        queue.push(parentGroup);
      }
    }
  }

  analyzeModuleDependencies(chunk, chunkGraph, moduleGraph, chunkDependencies) {
    for (const module of chunkGraph.getChunkModules(chunk)) {
      for (const connection of moduleGraph.getOutgoingConnections(module)) {
        const dependentModule = connection.module;
        const dependentChunks = chunkGraph.getModuleChunks(dependentModule);

        for (const dependentChunk of dependentChunks) {
          if (dependentChunk !== chunk) {
            chunkDependencies.get(chunk).add(dependentChunk);
          }
        }
      }
    }
  }

  printDependencies(chunkDependencies) {
    for (const [chunk, dependencies] of chunkDependencies) {
      console.log(`Chunk ${chunk.name || chunk.id} depends on:`);
      for (const dep of dependencies) {
        console.log(`  - ${dep.name || dep.id}`);
      }
    }
  }
}

export default SelfContainedVendorPlugin;
