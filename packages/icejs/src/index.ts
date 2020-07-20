const getBuiltInPlugins = (userConfig) => {
  if (userConfig.disableRuntime && !userConfig.miniapp) {
    return [
      'build-plugin-react-app',
      'build-plugin-ice-mpa'
    ];
  }

  let plugins = [];

  // common plugins
  const commonPlugins = [
    [
      'build-plugin-ice-core', {
        'framework': 'react'
      }
    ],
    'build-plugin-react-app',
  ];

  // for ice/react plugins
  const reactAppPlugins = [
    'build-plugin-ice-router',
    'build-plugin-ice-helpers',
    'build-plugin-ice-logger',
    'build-plugin-ice-config',
    'build-plugin-ice-request',
    'build-plugin-ice-mpa',
  ];

  // for miniapp plugins
  if (userConfig.miniapp) {
    plugins = commonPlugins;
  } else {
    plugins = commonPlugins.concat(reactAppPlugins);
  }

  if (userConfig.ssr) {
    plugins.push('build-plugin-ice-ssr');
  }

  // add store plugin
  if (!Object.prototype.hasOwnProperty.call(userConfig, 'store') || userConfig.store !== false) {
    plugins.push('build-plugin-ice-store');
  }

  return plugins;
};

module.exports = getBuiltInPlugins;
