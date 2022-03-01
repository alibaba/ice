import path from 'path';
import fse from 'fs-extra';
import findUp from 'find-up';

export interface RuntimeModule {
  staticModule: boolean;
  path: string;
  name: string;
}

export interface Plugin {
  pluginPath: string;
}

function getRuntimeModules(plugins: Plugin[]) {
  return plugins.map(({ pluginPath }) => {
    if (!pluginPath) return false;
    // for example: xx/build-plugin-app/lib/index.js
    const pluginDir = path.dirname(pluginPath);
    // for example: xx/build-plugin-app/package.json
    const pkgPath = findUp.sync('package.json', { cwd: pluginDir });
    // for example: xx/build-plugin-app/
    const packageDir = path.dirname(pkgPath);
    const runtimeDir = path.join(packageDir, 'runtime');
    if (fse.existsSync(runtimeDir)) {
      try {
        const pkgInfo = fse.readJSONSync(pkgPath);
        return {
          staticModule: !!pkgInfo?.pluginConfig?.staticModule,
          path: `${packageDir}/runtime`,
          name: pkgInfo.name as string,
        };
      } catch (error) {
        console.log(`ERROR: fail to load package.json of plugin ${path.basename(packageDir)}`);
      }
    }
    return false;
  }).filter(Boolean) as RuntimeModule[];
}

export default getRuntimeModules;
