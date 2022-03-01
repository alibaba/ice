// inspired by https://github.com/vercel/next.js/blob/canary/packages/next/build/webpack/require-hook.ts

// sync injects a hook for webpack and webpack/... requires to use the internal ncc webpack version
// this is in order for userland plugins to attach to the same webpack instance as next.js
// the individual compiled modules are as defined for the compilation in bundles/webpack/packages/*

import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export function getFileName(filePath: string) {
  return filePath.split('/').slice(-1)[0];
}

export function getHookFiles() {
  const webpackPlugins = [
    'webpack/lib/Compilation',
    'webpack/lib/dependencies/ConstDependency',
    'webpack/lib/javascript/JavascriptParserHelpers',
    'webpack/lib/LibraryTemplatePlugin',
    'webpack/lib/LoaderTargetPlugin',
    'webpack/lib/node/NodeTargetPlugin',
    'webpack/lib/node/NodeTemplatePlugin',
    'webpack/lib/NormalModule',
    'webpack/lib/RequestShortener',
    'webpack/lib/RuntimeGlobals',
    'webpack/lib/RuntimeModule',
    'webpack/lib/optimize/LimitChunkCountPlugin',
    'webpack/lib/ParserHelpers',
    'webpack/lib/SingleEntryPlugin',
    'webpack/lib/Template',
    'webpack/lib/webworker/WebWorkerTemplatePlugin',
    'webpack/lib/node/NodeEnvironmentPlugin',
    'webpack/lib/BasicEvaluatedExpression',
    'webpack/lib/ModuleFilenameHelpers',
    'webpack/lib/GraphHelpers',
    'webpack/lib/ExternalsPlugin',
    'webpack/lib/web/FetchCompileAsyncWasmPlugin',
    'webpack/lib/web/FetchCompileWasmPlugin',
    'webpack/lib/ProgressPlugin',
  ];
  const pluginMap = webpackPlugins.map((pluginPath) => {
    const pluginName = getFileName(pluginPath);
    return [pluginPath, `@builder/pack/deps/webpack/${pluginName}`];
  });

  return [
    ['webpack-dev-server', '@builder/pack/deps/webpack-dev-server'],
    ['webpack', '@builder/pack/deps/webpack/webpack-lib'],
    ['webpack/package', '@builder/pack/deps/webpack/package'],
    ['webpack/package.json', '@builder/pack/deps/webpack/package'],
    ['webpack/lib/webpack', '@builder/pack/deps/webpack/webpack-lib'],
    ['webpack/lib/webpack.js', '@builder/pack/deps/webpack/webpack-lib'],
    ['webpack-sources', '@builder/pack/deps/webpack/sources'],
    ['webpack-sources/lib', '@builder/pack/deps/webpack/sources'],
    ['webpack-sources/lib/index', '@builder/pack/deps/webpack/sources'],
    ['webpack-sources/lib/index.js', '@builder/pack/deps/webpack/sources'],
    ['webpack/hot/dev-server', '@builder/pack/deps/webpack/hot/dev-server'],
    ['webpack/hot/only-dev-server', '@builder/pack/deps/webpack/hot/only-dev-server'],
    ['webpack/hot/emitter', '@builder/pack/deps/webpack/hot/emitter'],
    ...pluginMap,
  ];
}

export function hijackWebpack() {
  const hookPropertyMap = new Map(
    getHookFiles().map(([request, replacement]) => [request, require.resolve(replacement)]),
  );
  // eslint-disable-next-line global-require
  const mod = require('module');
  const resolveFilename = mod._resolveFilename;
  mod._resolveFilename = function (
    request: string,
    parent: any,
    isMain: boolean,
    options: any,
  ) {
    const hookResolved = hookPropertyMap.get(request);
    if (hookResolved) request = hookResolved;
    return resolveFilename.call(mod, request, parent, isMain, options);
  };
}