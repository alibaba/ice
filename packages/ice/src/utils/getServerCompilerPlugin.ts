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
  dataCache: Map<string, string>;
  serverCompileTask: ExtendsPluginAPI['serverCompileTask'];
  ensureRoutesConfig: () => Promise<void>;
}
function getServerCompilerPlugin(serverCompiler: ServerCompiler, options: Options) {
  const { outputDir, rootDir, serverEntry, userConfig, dataCache, serverCompileTask, ensureRoutesConfig } = options;
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
        platform: isEsm ? 'browser' : 'node',
        outExtension: { '.js': isEsm ? '.mjs' : '.cjs' },
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
      },
    ],
    ensureRoutesConfig,
    serverCompileTask,
  );
}

export default getServerCompilerPlugin;