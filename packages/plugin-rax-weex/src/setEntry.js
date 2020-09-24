const { pathHelper: { absoluteModuleResolve } } = require('miniapp-builder-shared');

const { hmrClient } = require('rax-compile-config');

module.exports = (config, context) => {
  const { rootDir, command } = context;
  const isDev = command === 'start';
  const target = 'weex';

  // SPA
  const appEntry = absoluteModuleResolve(rootDir, './src/app');
  const entryConfig = config.entry('index');

  config.module.rule('appJSON')
    .use('loader')
    .tap(() => ({ type: target }));


  ['jsx', 'tsx'].forEach(tag => {
    config.module.rule(tag)
      .use('platform-loader')
      .options({
        platform: target,
      });
  });

  if (isDev) {
    entryConfig.add(hmrClient);
  }
  entryConfig.add(appEntry);
};
