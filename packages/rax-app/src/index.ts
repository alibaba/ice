const getBuiltInPlugins = (userConfig) => {
  const { targets = ['web'] } = userConfig;
  let compileIndex = 0;

  // built-in plugins for rax app
  const builtInPlugins = [
    ['build-plugin-app-core', {
      'framework': 'rax',
      'alias': 'rax-app'
    }],
    ['build-plugin-app-base', userConfig],
    'build-plugin-ice-store'
  ];

  if (targets.includes('web')) {
    builtInPlugins.push(['build-plugin-rax-web', { compileIndex }]);
    compileIndex++;
  }

  return builtInPlugins;
};

export = getBuiltInPlugins;
