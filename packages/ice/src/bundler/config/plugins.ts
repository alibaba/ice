import path from 'path';
import type { CommandName } from 'build-scripts';
import ServerRunnerPlugin from '../../webpack/ServerRunnerPlugin.js';
import { IMPORT_META_RENDERER, IMPORT_META_TARGET, WEB, FALLBACK_ENTRY, RUNTIME_TMP_DIR } from '../../constant.js';
import getServerCompilerPlugin from '../../utils/getServerCompilerPlugin.js';
import ReCompilePlugin from '../../webpack/ReCompilePlugin.js';
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

export const getFallbackEntry = (options: {
  rootDir: string;
  command: CommandName;
  fallbackEntry: boolean;
}): string => {
  const { command, fallbackEntry, rootDir } = options;
  if (command === 'build' && fallbackEntry) {
    return path.join(rootDir, RUNTIME_TMP_DIR, FALLBACK_ENTRY);
  }
  return '';
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
  fallbackEntry?: string;
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
  fallbackEntry,
}: ServerPluginOptions) => {
  if (serverRunner) {
    return new ServerRunnerPlugin(serverRunner, ensureRoutesConfig);
  } else {
    // It will be deprecated in the future.
    return getServerCompilerPlugin(serverCompiler, {
      rootDir,
      serverEntry,
      fallbackEntry,
      outputDir,
      serverCompileTask,
      userConfig,
      ensureRoutesConfig,
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
