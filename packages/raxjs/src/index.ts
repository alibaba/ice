const getBuiltInPlugins = (userConfig) => {
  const { targets = ['web'], miniapp = {} } = userConfig;

  // built-in plugins for raxjs
  const builtInPlugins = [
    ['build-plugin-ice-core', {
      'framework': 'rax'
    }],
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
