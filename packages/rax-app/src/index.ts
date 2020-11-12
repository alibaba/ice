const getBuiltInPlugins = (userConfig) => {
  const { targets = ['web'], store = true } = userConfig;

  // built-in plugins for rax app
  const builtInPlugins = [
    [
      'build-plugin-app-core',
      {
        framework: 'rax',
        alias: 'rax-app',
      },
    ],
    ['build-plugin-rax-app'],
  ];

  if (store) {
    builtInPlugins.push(['build-plugin-ice-store']);
  }

  if (targets.includes('web')) {
    builtInPlugins.push(['build-plugin-rax-web']);
    if (userConfig.web && userConfig.web.ssr) {
      builtInPlugins.push(['build-plugin-ssr']);
    }
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
