import path from 'path';
import type { ServerCompiler, ExtendsPluginAPI } from '../types/plugin.js';
import type { UserConfig } from '../types/userConfig.js';
import ServerCompilerPlugin from '../webpack/ServerCompilerPlugin.js';
import { SERVER_OUTPUT_DIR } from '../constant.js';
import getServerEntry from './getServerEntry.js';
import { getRoutePathsFromCache } from './getRoutePaths.js';

interface Options {
  rootDir: string;
  userConfig: UserConfig;
  outputDir: string;
  serverEntry: string;
  incremental: boolean;
  dataCache: Map<string, string>;
  serverCompileTask: ExtendsPluginAPI['serverCompileTask'];
  ensureRoutesConfig: () => Promise<void>;
  runtimeDefineVars: Record<string, string>;
}

function getServerCompilerPlugin(serverCompiler: ServerCompiler, options: Options) {
  const {
    outputDir,
    rootDir,
    serverEntry,
    userConfig,
    dataCache,
    serverCompileTask,
    ensureRoutesConfig,
    runtimeDefineVars,
    incremental,
  } = options;
  const entryPoint = getServerEntry(rootDir, serverEntry);
  const { ssg, ssr, server: { format } } = userConfig;
  const isEsm = userConfig?.server?.format === 'esm';
  return new ServerCompilerPlugin(
    serverCompiler,
    [
      {
        entryPoints: { index: entryPoint },
        outdir: path.join(outputDir, SERVER_OUTPUT_DIR),
        splitting: isEsm,
        format,
        // When format set to esm and platform set to node,
        // will cause error `Dynamic require of "XXX" is not supported`.
        // https://github.com/evanw/esbuild/issues/1921
        platform: isEsm ? 'browser' : 'node',
        mainFields: ['module', 'main'],
        outExtension: { '.js': isEsm ? '.mjs' : '.cjs' },
        metafile: true,
        logLevel: 'silent', // The server compiler process will log it in debug.
        incremental,
      },
      {
        preBundle: format === 'esm' && (ssr || ssg),
        swc: {
          keepExports: (!ssg && !ssr) ? ['pageConfig'] : null,
          keepPlatform: 'node',
          getRoutePaths: () => {
            return getRoutePathsFromCache(dataCache);
          },
        },
        removeOutputs: true,
        runtimeDefineVars,
      },
    ],
    ensureRoutesConfig,
    serverCompileTask,
  );
}

export default getServerCompilerPlugin;
