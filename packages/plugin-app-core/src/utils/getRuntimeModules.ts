import * as path from 'path';
import * as fse from 'fs-extra';
import formatPath from './formatPath';

export default (plugins: any = []) => {
  return plugins.map(({ pluginPath }) => {
    // compatible with function plugin
    if (!pluginPath) return false;
    // NOTE: module.js will be discarded in future.
    let modulePath = path.join(path.dirname(pluginPath), 'runtime.js');
    if(!fse.existsSync(modulePath)){
      modulePath = path.join(path.dirname(pluginPath), 'module.js');
      if(!fse.existsSync(modulePath)){
        return false;
      }
      console.log(`WARN: module.ts(x) will not be supported in the future. Please rename as runtime.ts(x) in ${modulePath}`);
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
