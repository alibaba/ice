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
  return builtInPlugins;
};

module.exports = getBuiltInPlugins;
