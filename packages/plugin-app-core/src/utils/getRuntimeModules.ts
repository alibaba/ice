import * as path from 'path';
import * as fse from 'fs-extra';
import * as globby from 'globby';
import formatPath from './formatPath';

export default (plugins: any = [], targetDir: string, debugRuntime: boolean) => {
  return plugins.map(({ pluginPath, name }) => {
    // compatible with function plugin
    if (!pluginPath) return false;
    // NOTE: module.js will be discarded in future.
    const pluginDir = path.dirname(pluginPath);
    let modulePath = path.join(pluginDir, 'runtime.js');
    const moduleDir = path.join(pluginDir, '..');
    if(!fse.existsSync(modulePath)){
      modulePath = path.join(pluginDir, 'module.js');
      if(!fse.existsSync(modulePath)){
        return false;
      }
      console.log(`WARN: module.ts(x) will not be supported in the future. Please rename as runtime.ts(x) in ${modulePath}`);
    } else if (name && debugRuntime){
      // copy module dir to target dir
      const tempDir = path.join(targetDir, 'plugins', name);
      fse.ensureDirSync(tempDir);
      // ensure source dir
      const srcDir = path.join(moduleDir, 'src');
      if (fse.existsSync(srcDir)) {
        fse.copySync(srcDir, tempDir);
        const runtimePaths = globby.sync('runtime.@((t|j)s?(x))', { cwd: tempDir });
        if (runtimePaths.length > 0) {
          modulePath = path.join(tempDir, runtimePaths[0]);
        }
      } else {
        fse.copySync(pluginDir, tempDir);
        modulePath = path.join(tempDir, 'runtime.js');
      }
    }
    // read package.json
    let pluginConfig = {};
    const pkgPath = path.join(moduleDir, 'package.json');
    try {
      pluginConfig = fse.readJSONSync(pkgPath).pluginConfig;
    } catch(error) {
      console.log(`ERROR: fail to load package.json of plugin ${name}`);
    }
    return {
      pluginConfig,
      modulePath: formatPath(modulePath),
    };
  })
    .filter(Boolean)
    .map(({ modulePath, pluginConfig }) => {
      const staticModule = (pluginConfig && pluginConfig.staticModule) || false;
      return {
        staticModule,
        path: modulePath
      };
    });
};
