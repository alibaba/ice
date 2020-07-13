const getBuiltInPlugins = () => {
  // built-in plugins for icejs
  const builtInPlugins = [
    [
      'build-plugin-ice-core', {
        'framework': 'react'
      }
    ],
    'build-plugin-react-app',
    'build-plugin-ice-router'
  ];
  return builtInPlugins;
};

export = getBuiltInPlugins
