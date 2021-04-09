import { IGetBuiltInPlugins, IPluginList, Json } from '@alib/build-scripts';

// eslint-disable-next-line
const chalk = require('chalk');

const getBuiltInPlugins: IGetBuiltInPlugins = (userConfig) => {
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

  const HOOKS_STORE_PLUGIN_KEY = 'build-plugin-hooks-store';
  // const existHooksStorePlugin = userConfig.plugins && userConfig.plugins.some(plugin => {
  //   if (typeof plugin === 'string') {
  //     return plugin === HOOKS_STORE_PLUGIN_KEY;
  //   } else if (Array.isArray(plugin)) {
  //     return plugin[0] === HOOKS_STORE_PLUGIN_KEY;
  //   } else {
  //     return false;
  //   }
  // });

  // if(existHooksStorePlugin) {
  //   console.log('');
  //   console.log(chalk.magenta('You have used build-plugin-hooks-store. The build-plugin-ice-store built in has been disabled.'));
  //   console.log('');
  // }
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
