import ServerRunnerPlugin from '../../webpack/ServerRunnerPlugin.js';
import { IMPORT_META_RENDERER, IMPORT_META_TARGET, WEB } from '../../constant.js';
import getServerCompilerPlugin from '../../utils/getServerCompilerPlugin.js';
import ReCompilePlugin from '../../webpack/ReCompilePlugin.js';
import getEntryPoints from '../../utils/getEntryPoints.js';
import { multipleServerEntry } from '../../utils/multipleEntry.js';
import type ServerRunner from '../../service/ServerRunner';
import type ServerCompileTask from '../../utils/ServerCompileTask.js';
import type { ServerCompiler, UserConfig } from '../../types';
import type RouteManifest from '../../utils/routeManifest.js';

export const getSpinnerPlugin = (spinner, name?: string) => {
  return (compiler) => {
    compiler.hooks.beforeCompile.tap('spinner', () => {
      spinner.text = `Compiling task ${name || 'web'}...\n`;
    });
    compiler.hooks.afterEmit.tap('spinner', () => {
      spinner.stop();
    });
  };
};

interface ServerPluginOptions {
  serverRunner?: ServerRunner;
  serverCompiler?: ServerCompiler;
  serverCompileTask?: ServerCompileTask;
  rootDir?: string;
  outputDir?: string;
  target?: string;
  serverEntry?: string;
  ensureRoutesConfig: () => Promise<void>;
  userConfig?: UserConfig;
  getFlattenRoutes?: () => string[];
  command?: string;
}
export const getServerPlugin = ({
  serverRunner,
  ensureRoutesConfig,
  serverCompiler,
  target = WEB,
  rootDir,
  serverEntry,
  outputDir,
  serverCompileTask,
  userConfig,
  getFlattenRoutes,
  command,
}: ServerPluginOptions) => {
  if (serverRunner) {
    return new ServerRunnerPlugin(serverRunner, ensureRoutesConfig);
  } else {
    // It will be deprecated in the future.
    return getServerCompilerPlugin(serverCompiler, {
      rootDir,
      serverEntry,
      outputDir,
      serverCompileTask,
      userConfig,
      ensureRoutesConfig,
      entryPoints: multipleServerEntry(userConfig, command)
        ? getEntryPoints(rootDir, getFlattenRoutes(), serverEntry) : undefined,
      runtimeDefineVars: {
        [IMPORT_META_TARGET]: JSON.stringify(target),
        [IMPORT_META_RENDERER]: JSON.stringify('server'),
      },
    });
  }
};

export const getReCompilePlugin = (reCompile: (taskKey: string) => void, routeManifest: RouteManifest) => {
  return new ReCompilePlugin(reCompile, (files) => {
    // Only when routes file changed.
    const routeFiles = routeManifest.getRoutesFile();
    return files.some((filePath) => routeFiles.some(routeFile => filePath.includes(routeFile)));
  });
};
