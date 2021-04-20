import { IGetBuiltInPlugins, IPluginList, Json } from 'build-scripts';
import { init } from '@builder/pack/deps/webpack/webpack';
import { hijack } from './require-hook';

// eslint-disable-next-line
const chalk = require('chalk');

const getBuiltInPlugins: IGetBuiltInPlugins = (userConfig) => {
  // enable webpack 5 by default
  if (userConfig.webpack5 !== false) {
    process.env.__WEBPACK_5__ = 'true';
  }
  init(!!process.env.__WEBPACK_5__);
  hijack();

  if (userConfig.disableRuntime) {
    return [
      'build-plugin-react-app',
      'build-plugin-ice-mpa'
    ];
  }
  const coreOptions = {
    'framework': 'react',
    'alias': process.env.__FRAMEWORK_NAME__ || 'ice'
  } as Json;
  const plugins: IPluginList = [
    // common plugins
    ['build-plugin-app-core', coreOptions],

    // react base plugin
    'build-plugin-react-app',

    // for ice/miniapp plugins
    'build-plugin-miniapp',

    // for ice/react plugins
    'build-plugin-ice-router',
    'build-plugin-ice-helpers',
    'build-plugin-ice-logger',
    'build-plugin-ice-config',
    'build-plugin-ice-mpa',
    'build-plugin-ice-request',
    'build-plugin-helmet'
  ];

  if (userConfig.ssr) {
    plugins.push('build-plugin-ice-ssr');
  }

  // add store plugin
  if (!Object.prototype.hasOwnProperty.call(userConfig, 'store') || userConfig.store !== false) {
    plugins.push('build-plugin-ice-store');
  }

  const ICE_AUTH_PLUGIN_KEY = 'build-plugin-ice-auth';
  const existIceAuthPlugin = userConfig.plugins && userConfig.plugins.some(plugin => {
    if (typeof plugin === 'string') {
      return plugin === ICE_AUTH_PLUGIN_KEY;
    } else if (Array.isArray(plugin)) {
      return plugin[0] === ICE_AUTH_PLUGIN_KEY;
    } else {
      return false;
    }
  });

  if (existIceAuthPlugin) {
    console.log('');
    console.log(chalk.magenta('The build-plugin-ice-auth has been built in. Please remove it from build.json.'));
    console.log('');
  } else if (userConfig.auth !== false) {
    plugins.push('build-plugin-ice-auth');
  }

  return plugins;
};

export = getBuiltInPlugins;
