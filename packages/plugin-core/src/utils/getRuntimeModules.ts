import * as path from 'path';
import * as fse from 'fs-extra';
import formatPath from './formatPath';

export default (plugins: any = []) => {
  return plugins.map(({ pluginPath }) => {
    if (!pluginPath) return false;
    const modulePath = path.join(path.dirname(pluginPath), 'module.js');
    return fse.existsSync(modulePath) ? formatPath(modulePath) : false;
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
