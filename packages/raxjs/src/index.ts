const getBuiltInPlugins = (userConfig) => {
  const { targets = ['web'], miniapp = {} } = userConfig;

  console.log('miniapp buildType:', miniapp);

  // built-in plugins for raxjs
  const builtInPlugins = [
    ['build-plugin-ice-core', {
      'framework': 'rax'
    }],
    ['build-plugin-rax-app', {
      targets,
      miniapp: {
        buildType: miniapp.buildType || 'runtime'
      }
    }]
  ];

  return builtInPlugins;
};

export = getBuiltInPlugins;
