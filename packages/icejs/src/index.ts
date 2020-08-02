const getBuiltInPlugins = (userConfig) => {
  if (userConfig.disableRuntime) {
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
    'build-plugin-ice-request'
  ];

  // for ice/react plugins
  const reactAppPlugins = [
    'build-plugin-ice-router',
    'build-plugin-ice-helpers',
    'build-plugin-ice-logger',
    'build-plugin-ice-config',
    'build-plugin-ice-mpa',
  ];

  // for ice/miniapp plugins
  const miniAppPlugins = [
    'build-plugin-miniapp'
  ];

  // for miniapp plugins
  if (Array.isArray(userConfig.targets) && userConfig.targets.includes('miniapp')) {
    plugins = commonPlugins.concat(miniAppPlugins);
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
