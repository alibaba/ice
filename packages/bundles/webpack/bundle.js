module.exports = {
  BasicEvaluatedExpression: require('webpack/lib/javascript/BasicEvaluatedExpression'),
  ModuleFilenameHelpers: require('webpack/lib/ModuleFilenameHelpers'),
  NodeTargetPlugin: require('webpack/lib/node/NodeTargetPlugin'),
  NodeTemplatePlugin: require('webpack/lib/node/NodeTemplatePlugin'),
  LibraryTemplatePlugin: require('webpack/lib/LibraryTemplatePlugin'),
  LimitChunkCountPlugin: require('webpack/lib/optimize/LimitChunkCountPlugin'),
  WebWorkerTemplatePlugin: require('webpack/lib/webworker/WebWorkerTemplatePlugin'),
  ExternalsPlugin: require('webpack/lib/ExternalsPlugin'),
  SingleEntryPlugin: require('webpack/lib/SingleEntryPlugin'),
  FetchCompileAsyncWasmPlugin: require('webpack/lib/web/FetchCompileAsyncWasmPlugin'),
  FetchCompileWasmPlugin: require('webpack/lib/web/FetchCompileWasmPlugin'),
  JavascriptModulesPlugin: require('webpack/lib/javascript/JavascriptModulesPlugin'),
  StartupChunkDependenciesPlugin: require('webpack/lib/runtime/StartupChunkDependenciesPlugin'),
  StartupHelpers: require('webpack/lib/javascript/StartupHelpers'),
  compileBooleanMatcher: require('webpack/lib/util/compileBooleanMatcher'),
  identifier: require('webpack/lib/util/identifier'),
  StringXor: require('webpack/lib/util/StringXor'),
  NormalModule: require('webpack/lib/NormalModule'),
  EntryDependency: require('webpack/lib/dependencies/EntryDependency'),
  ModuleNotFoundError: require('webpack/lib/ModuleNotFoundError'),
  LazySet: require('webpack/lib/util/LazySet'),
  fs: require('webpack/lib/util/fs'),
  sources: require('webpack').sources,
  webpack: require('webpack'),
  package: {
    version: require('webpack/package.json').version,
  },
};
