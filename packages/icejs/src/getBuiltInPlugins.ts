import { IGetBuiltInPlugins, IPluginList, IUserConfig, Json } from 'build-scripts';
import { init } from '@builder/pack/deps/webpack/webpack';
import { hijackWebpack } from './require-hook';

// eslint-disable-next-line
const chalk = require('chalk');

const getDynamicPlugins = (userConfig: IUserConfig) => {
  const { plugins } = userConfig;
  const dynamicPlugins: [string, string, boolean][] = [
    ['build-plugin-ice-ssr', 'ssr', false],
    ['build-plugin-ice-store', 'store', true],
    ['build-plugin-ice-auth', 'auth', true],
    ['build-plugin-pwa', 'pwa', false],
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
        console.log('');
        console.log(chalk.magenta(`The ${pluginName} has been built in. Please remove it from build.json.`));
        console.log('');
      } else  {
        return Object.prototype.hasOwnProperty.call(userConfig, configKey) ? userConfig[configKey] : defaultValue;
      }
      return false;
    })
    .map(([name]) => name);

};

const getBuiltInPlugins: IGetBuiltInPlugins = (userConfig) => {
  // enable webpack 5 by default
  const useWebpack5 = true;
  init(useWebpack5);
  hijackWebpack();

  if (userConfig.disableRuntime) {
    return [
      'build-plugin-react-app',
      'build-plugin-ice-mpa'
    ];
  }
  // eslint-disable-next-line
  const pkg = require('../package.json');
  process.env.__FRAMEWORK_VERSION__ = pkg.version;
  const coreOptions = {
    'framework': 'react',
    'alias': process.env.__FRAMEWORK_NAME__ || 'ice'
  } as Json;
  const plugins: IPluginList = [
    // common plugins
    ['build-plugin-app-core', coreOptions],
    'build-plugin-ice-logger',

    // react base plugin
    'build-plugin-react-app',

    // for ice/react plugins
    'build-plugin-ice-router',
    'build-plugin-ice-config',
    'build-plugin-ice-mpa',
    'build-plugin-ice-request',
    'build-plugin-helmet'
  ];

  const dynamicPlugins = getDynamicPlugins(userConfig);

  return plugins.concat(dynamicPlugins);
};

export = getBuiltInPlugins;
