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
    'build-plugin-ice-request',
    'build-plugin-ice-auth'
  ];

  if (userConfig.ssr) {
    plugins.push('build-plugin-ice-ssr');
  }

  // add store plugin
  if (!Object.prototype.hasOwnProperty.call(userConfig, 'store') || userConfig.store !== false) {
    plugins.push('build-plugin-ice-store');
  }

  return plugins;
};
