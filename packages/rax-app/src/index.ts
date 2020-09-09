const getBuiltInPlugins = (userConfig) => {
  const { targets = ['web'], miniapp = {} } = userConfig;

  // built-in plugins for rax app
  const builtInPlugins = [
    ['build-plugin-app-core', {
      'framework': 'rax',
      'alias': 'rax-app'
    }],
    'build-plugin-ice-store',
    ['build-plugin-rax-app', {
      enterCheck: false,
      targets,
      miniapp: {
        buildType: miniapp.buildType || 'runtime'
      }
    }]
  ];

  return builtInPlugins;
};

export = getBuiltInPlugins;
