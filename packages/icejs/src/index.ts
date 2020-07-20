const getBuiltInPlugins = (userConfig) => {
  // built-in plugins for icejs
  const builtInPlugins = [
    [
      'build-plugin-ice-core', {
        'framework': 'react'
      }
    ],
    'build-plugin-react-app'
  ];

  if (!userConfig.miniapp) {
    builtInPlugins.push('build-plugin-ice-router');
  }

  if (!Object.prototype.hasOwnProperty.call(userConfig, 'store') || userConfig.store !== false) {
    builtInPlugins.push('build-plugin-ice-store');
  }

  return builtInPlugins;
};

module.exports = getBuiltInPlugins;
