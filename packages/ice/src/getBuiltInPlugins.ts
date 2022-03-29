import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import consola from 'consola';
import fse from 'fs-extra';
import type { IGetBuiltInPlugins, IPluginList, IUserConfig } from 'build-scripts';
import { hijackWebpack } from './requireHook.js';
import { builtInPlugins } from './constant.js';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// avoid multi wabpack
hijackWebpack();

const getDynamicPlugins = (userConfig: IUserConfig) => {
  const { plugins } = userConfig;
  const dynamicPlugins: [string, string, boolean][] = [];

  const checkPluginExist = (name: string) => {
    return plugins && plugins.some(plugin => {
      if (typeof plugin === 'string') {
        return plugin === name;
      } else if (Array.isArray(plugin)) {
        return plugin[0] === name;
      } else {
        return false;
      }
    });
  };

  return dynamicPlugins
    .filter(([pluginName, configKey, defaultValue]) => {
      const exist = checkPluginExist(pluginName);
      if (exist) {
        consola.warn('');
        consola.warn(`The ${pluginName} has been built in. Please remove it from build.json.`);
        consola.warn('');
      } else {
        return Object.prototype.hasOwnProperty.call(userConfig, configKey) ? userConfig[configKey] : defaultValue;
      }
      return false;
    })
    .map(([name]) => name);
};

const getBuiltInPlugins: IGetBuiltInPlugins = (userConfig) => {
  // eslint-disable-next-line
  const pkg = fse.readJSONSync(path.resolve(__dirname, '../package.json'));
  process.env.__FRAMEWORK_VERSION__ = pkg.version;
  let plugins: IPluginList = builtInPlugins.map((pluginName) => require.resolve(pluginName));
  const dynamicPlugins = getDynamicPlugins(userConfig);

  return plugins.concat(dynamicPlugins);
};

export default getBuiltInPlugins;
