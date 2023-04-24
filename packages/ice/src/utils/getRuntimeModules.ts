import * as path from 'path';
import { RUNTIME_TMP_DIR } from '../constant.js';
import type { PluginData } from '../types/plugin.js';
import formatPath from './formatPath.js';

export interface RuntimeModule {
  staticRuntime: boolean;
  path: string;
  name: string;
}

function getRuntimeModules(plugins: PluginData[], rootDir: string) {
  return plugins
    .filter(({ runtime }) => !!runtime)
    .map(({ name, runtime, staticRuntime }) => {
      return {
        name,
        path: path.isAbsolute(runtime)
          ? formatPath(path.relative(path.join(rootDir, RUNTIME_TMP_DIR), runtime)) // Be compatible with win32.
          : runtime,
        staticRuntime,
      };
    });
}

export default getRuntimeModules;
