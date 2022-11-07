import type { PluginData } from '../types/plugin.js';

export interface RuntimeModule {
  staticRuntime: boolean;
  path: string;
  name: string;
}

function getRuntimeModules(plugins: PluginData[]) {
  return plugins
    .filter(({ runtime }) => !!runtime)
    .map(({ name, runtime, staticRuntime }) => ({ name, path: runtime, staticRuntime }));
}

export default getRuntimeModules;
