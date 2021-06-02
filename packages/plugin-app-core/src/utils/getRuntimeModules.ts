import * as path from 'path';
import * as fse from 'fs-extra';
import * as globby from 'globby';
import formatPath from './formatPath';

export default (plugins: any = [], targetDir: string) => {
  return plugins.map(({ pluginPath, name }) => {
    // compatible with function plugin
    if (!pluginPath) return false;
    // NOTE: module.js will be discarded in future.
    const pluginDir = path.dirname(pluginPath);
    let modulePath = path.join(pluginDir, 'runtime.js');
    const moduleDir = path.join(pluginDir, '..');
    if(!fse.existsSync(modulePath)){
      // filter plugin without runtime
      return false;
    } else if (name){
      // copy module dir to target dir
      const tempDir = path.join(targetDir, 'plugins', name);
      // ensure source dir
      const srcDir = path.join(moduleDir, 'src');
      if (fse.existsSync(srcDir)) {
        const runtimePaths = globby.sync('runtime.@((t|j)s?(x))', { cwd: srcDir });
        if (runtimePaths.length > 0) {
          // copy source code when runtime exsists
          fse.ensureDirSync(tempDir);
          fse.copySync(srcDir, tempDir);
          modulePath = `./${path.relative(targetDir, path.join(tempDir, runtimePaths[0]).replace(/.(t|j)(s|sx)$/, ''))}`;
        }
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
