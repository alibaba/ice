import * as path from 'path';
import * as fse from 'fs-extra';
import formatPath from './formatPath';

export default (plugins: any = [], targetDir: string) => {
  console.log('pluginInfo', plugins);
  return plugins.map(({ pluginPath, name }) => {
    // compatible with function plugin
    if (!pluginPath) return false;
    // NOTE: module.js will be discarded in future.
    let modulePath = path.join(path.dirname(pluginPath), 'runtime.js');
    const moduleDir = path.join(path.dirname(pluginPath), '..');
    if(!fse.existsSync(modulePath)){
      modulePath = path.join(path.dirname(pluginPath), 'module.js');
      if(!fse.existsSync(modulePath)){
        return false;
      }
      console.log(`WARN: module.ts(x) will not be supported in the future. Please rename as runtime.ts(x) in ${modulePath}`);
    } else if (name){
      // copy module dir to target dir
      const pluginDir = path.join(targetDir, 'plugins', name);
      fse.ensureDirSync(pluginDir);
      fse.copySync(moduleDir, pluginDir);
    }
    return formatPath(modulePath);
  })
    .filter(Boolean)
    .map(pluginPath => {
      const pkgPath = path.join(pluginPath, '../../package.json');
      const { pluginConfig } = fse.readJSONSync(pkgPath);
      const staticModule = (pluginConfig && pluginConfig.staticModule) || false;
      return {
        staticModule,
        path: pluginPath
      };
    });
};
