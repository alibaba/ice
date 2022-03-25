// inspired by https://github.com/vercel/next.js/blob/canary/packages/next/build/webpack/require-hook.ts

// sync injects a hook for webpack and webpack/... requires to use the internal ncc webpack version
// this is in order for userland plugins to attach to the same webpack instance as next.js
// the individual compiled modules are as defined for the compilation in bundles/webpack/packages/*
import * as path from 'path';
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
    'webpack/lib/Parser',
    'webpack/lib/SingleEntryPlugin',
    'webpack/lib/Template',
    'webpack/lib/webworker/WebWorkerTemplatePlugin',
    'webpack/lib/node/NodeEnvironmentPlugin',
    'webpack/lib/ModuleFilenameHelpers',
    'webpack/lib/GraphHelpers',
    'webpack/lib/ExternalsPlugin',
    'webpack/lib/web/FetchCompileAsyncWasmPlugin',
    'webpack/lib/web/FetchCompileWasmPlugin',
    'webpack/lib/ProgressPlugin',
  ];
  const webpackDir = path.join(require.resolve('webpack'), '../../');
  const pluginMap = webpackPlugins.map((pluginPath) => {
    // const pluginName = getFileName(pluginPath);
    return [pluginPath, pluginPath.replace(/^webpack\//, webpackDir)];
  });

  return [
    // ['webpack-dev-server', '@builder/pack/deps/webpack-dev-server'],
    ['webpack', `${webpackDir}/lib`],
    ['webpack/package', `${webpackDir}package`],
    ['webpack/package.json', `${webpackDir}package`],
    ['webpack/lib/webpack', `${webpackDir}lib/webpack`],
    ['webpack/lib/webpack.js', `${webpackDir}lib/webpack`],
    ['webpack/hot/dev-server', `${webpackDir}hot/dev-server`],
    ['webpack/hot/only-dev-server', `${webpackDir}hot/only-dev-server`],
    ['webpack/hot/emitter', `${webpackDir}hot/emitter`],
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