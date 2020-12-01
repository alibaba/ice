const chalk = require('chalk');

module.exports = (userConfig: any) => {
  if (userConfig.disableRuntime) {
    return [
      'build-plugin-react-app',
      'build-plugin-ice-mpa'
    ];
  }

  const plugins = [
    // common plugins
    [
      'build-plugin-app-core', {
        'framework': 'react',
        'alias': process.env.__FRAMEWORK_NAME__ || 'ice'
      }
    ],
    'build-plugin-react-app',

    // for ice/miniapp plugins
    'build-plugin-miniapp',

    // for ice/react plugins
    'build-plugin-ice-router',
    'build-plugin-ice-helpers',
    'build-plugin-ice-logger',
    'build-plugin-ice-config',
    'build-plugin-ice-mpa',
    'build-plugin-ice-request'
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
