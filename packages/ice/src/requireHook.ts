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
    // plugins require the same webpack instance
    'webpack/lib/LibraryTemplatePlugin',
    'webpack/lib/node/NodeTargetPlugin',
    'webpack/lib/node/NodeTemplatePlugin',
    'webpack/lib/NormalModule',
    'webpack/lib/optimize/LimitChunkCountPlugin',
    'webpack/lib/SingleEntryPlugin',
    'webpack/lib/webworker/WebWorkerTemplatePlugin',
    'webpack/lib/node/NodeEnvironmentPlugin',
    'webpack/lib/ModuleFilenameHelpers',
    'webpack/lib/GraphHelpers',
    'webpack/lib/ExternalsPlugin',
    'webpack/lib/web/FetchCompileAsyncWasmPlugin',
    'webpack/lib/web/FetchCompileWasmPlugin',
  ];
  const webpackDir = path.join(require.resolve('@ice/bundles/compiled/webpack'), '../');
  const pluginMap = webpackPlugins.map((pluginPath) => {
    return [pluginPath, pluginPath.replace(/^webpack\/lib\/((web|node|optimize|webworker)\/)?/, webpackDir)];
  });

  return [
    // ['webpack-dev-server', '@builder/pack/deps/webpack-dev-server'],
    ['webpack', `${webpackDir}webpack-lib`],
    ['webpack/lib/webpack', `${webpackDir}webpack-lib`],
    ['webpack/lib/webpack.js', `${webpackDir}webpack-lib`],
    ['webpack/hot/dev-server', `${webpackDir}hot/dev-server`],
    ['webpack/hot/only-dev-server', `${webpackDir}hot/only-dev-server`],
    ['webpack/hot/emitter', `${webpackDir}hot/emitter`],
    ...pluginMap,
  ];
}

function hijackWebpack() {
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
// avoid multi webpack
hijackWebpack();
