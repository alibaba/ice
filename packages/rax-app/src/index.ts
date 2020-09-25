const getBuiltInPlugins = (userConfig) => {
  const { targets = ['web'] } = userConfig;

  // built-in plugins for rax app
  const builtInPlugins = [
    [
      'build-plugin-app-core',
      {
        framework: 'rax',
        alias: 'rax-app',
      },
    ],
    ['build-plugin-app-base', userConfig],
    'build-plugin-ice-store',
  ];

  if (targets.includes('web')) {
    builtInPlugins.push(['build-plugin-rax-web']);
  }

  if (targets.includes('weex')) {
    builtInPlugins.push(['build-plugin-rax-weex']);
  }

  if (targets.includes('kraken')) {
    builtInPlugins.push(['build-plugin-rax-kraken']);
  }

  if (
    targets.includes('miniapp') ||
    targets.includes('wechat-miniprogram') ||
    targets.includes('bytedance-microapp')
  ) {
    builtInPlugins.push(['build-plugin-rax-miniapp']);
  }

  return builtInPlugins;
};

export = getBuiltInPlugins;
