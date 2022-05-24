import path from 'path';
import fse from 'fs-extra';
import findUp from 'find-up';
import consola from 'consola';
import type { PluginInfo } from 'build-scripts';
import type { ExtendsPluginAPI } from '@ice/types/esm/plugin.js';

export interface RuntimeModule {
  staticModule: boolean;
  path: string;
  name: string;
}

function getRuntimeModules(plugins: Array<PluginInfo<any, ExtendsPluginAPI>>) {
  const runtimes = plugins
    .filter(({ runtime }) => !!runtime)
    .map(({ name, runtime }) => ({ name, runtime }));
  return runtimes.map(({ runtime, name }) => {
    // for example: xx/build-plugin-app/lib/index.js
    const pluginDir = path.dirname(runtime);
    // for example: xx/build-plugin-app/package.json
    const pkgPath = findUp.sync('package.json', { cwd: pluginDir });
    // for example: xx/build-plugin-app/
    const packageDir = path.dirname(pkgPath);
    if (fse.existsSync(runtime)) {
      try {
        const pkgInfo = fse.readJSONSync(pkgPath);
        return {
          staticModule: !!pkgInfo?.pluginConfig?.staticModule,
          path: path.join(pkgInfo.name, path.relative(packageDir, runtime)),
          name: pkgInfo.name as string,
        };
      } catch (error) {
        consola.error(`ERROR: fail to load package.json of plugin ${path.basename(packageDir)}`);
      }
    } else {
      consola.warn(`runtime is not exist in ${name}`);
    }
    return false;
  }).filter(Boolean) as RuntimeModule[];
}

export default getRuntimeModules;
