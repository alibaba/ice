import path from 'path';
import type { ServerCompiler, ExtendsPluginAPI } from '../types/plugin.js';
import type { UserConfig } from '../types/userConfig.js';
import ServerCompilerPlugin from '../webpack/ServerCompilerPlugin.js';
import { SERVER_OUTPUT_DIR } from '../constant.js';
import getServerEntry from './getServerEntry.js';

interface Options {
  rootDir: string;
  userConfig: UserConfig;
  outputDir: string;
  serverEntry: string;
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
    serverCompileTask,
    ensureRoutesConfig,
    runtimeDefineVars,
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
        platform: 'node',
        mainFields: ['module', 'main'],
        outExtension: { '.js': isEsm ? '.mjs' : '.cjs' },
        metafile: true,
        logLevel: 'silent', // The server compiler process will log it in debug.
      },
      {
        // The server bundle will external all the dependencies when the format type is esm,
        // so we need to prebundle all the dependencies first to avoid errors of importing non-js file in ESM.
        preBundle: format === 'esm' && (ssr || ssg),
        swc: {
          keepExports: (!ssg && !ssr) ? ['pageConfig'] : null,
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
