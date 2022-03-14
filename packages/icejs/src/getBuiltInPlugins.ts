import { IGetBuiltInPlugins, IPluginList, IUserConfig, Json } from 'build-scripts';
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
    ['build-plugin-ice-request', 'request', true],
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
  let plugins: IPluginList = [
    // common plugins
    ['build-plugin-app-core', coreOptions],
    'build-plugin-ice-logger',

    // react base plugin
    'build-plugin-react-app',

    // for ice/react plugins
    'build-plugin-ice-router',
    'build-plugin-ice-config',
    'build-plugin-ice-mpa',
    'build-plugin-helmet',
    'build-plugin-speed',
  ];

  if (userConfig.mpa && userConfig.router === false) {
    console.warn('Warning:', 'MPA 模式下 router: false 选项没有意义，建议移除该选项。');
  }

  if (!userConfig.mpa && userConfig.router === false) {
    // SPA 并且设置了 router: false 则过滤 router 插件
    plugins = plugins.filter((name) => name !== 'build-plugin-ice-router');
  }

  const dynamicPlugins = getDynamicPlugins(userConfig);

  return plugins.concat(dynamicPlugins);
};

export = getBuiltInPlugins;
