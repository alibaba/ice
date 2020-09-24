const getBuiltInPlugins = (userConfig) => {
  const { targets = ['web'] } = userConfig;

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
    builtInPlugins.push(['build-plugin-rax-web', { taskIndex: 0 }]);
  }

  if (targets.includes('weex')) {
    builtInPlugins.push(['build-plugin-rax-weex']);
  }

  return builtInPlugins;
};

export = getBuiltInPlugins;
