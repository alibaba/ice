import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import consola from 'consola';
import fse from 'fs-extra';
import { hijackWebpack } from './requireHook.js';
import type { IGetBuiltInPlugins, IPluginList, IUserConfig, Json } from 'build-scripts';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getDynamicPlugins = (userConfig: IUserConfig) => {
  const { plugins } = userConfig;
  const dynamicPlugins: [string, string, boolean][] = [
    /* ['build-plugin-ice-ssr', 'ssr', false],
    ['build-plugin-ice-store', 'store', true],
    ['build-plugin-ice-auth', 'auth', true],
    ['build-plugin-pwa', 'pwa', false],
    ['build-plugin-ice-request', 'request', true], */
  ];

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
  // enable webpack 5 by default
  // hijackWebpack();
  // eslint-disable-next-line
  const pkg = fse.readJSONSync(path.resolve(__dirname, '../package.json'));
  process.env.__FRAMEWORK_VERSION__ = pkg.version;
  const coreOptions = {
    framework: 'react',
    alias: process.env.__FRAMEWORK_NAME__ || 'ice',
  } as Json;
  let plugins: IPluginList = [
    // common plugins
    // ['build-plugin-app-core', coreOptions],
    // 'build-plugin-ice-logger',

    // react base plugin
    require.resolve('@ice/plugin-app'),
    require.resolve('@ice/plugin-router'),
    require.resolve('@ice/plugin-auth'),
    // for ice/react plugins
    /* 'build-plugin-ice-config',
    'build-plugin-ice-mpa',
    'build-plugin-helmet',
    'build-plugin-speed', */
  ];

  const dynamicPlugins = getDynamicPlugins(userConfig);

  return plugins.concat(dynamicPlugins);
};

export default getBuiltInPlugins;
