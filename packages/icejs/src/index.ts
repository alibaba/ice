const getBuiltInPlugins = (userConfig) => {
  // built-in plugins for icejs
  const builtInPlugins = userConfig.disableRuntime
    ? ['build-plugin-react-app']
    : ['build-plugin-ice-core',
      'build-plugin-react-app',
      'build-plugin-ice-router',
      'build-plugin-ice-helpers',
      'build-plugin-ice-logger',
      'build-plugin-ice-config',
      'build-plugin-ice-request'];

  if (userConfig.mpa) {
    builtInPlugins.push('build-plugin-ice-mpa');
  }

  if (userConfig.ssr) {
    builtInPlugins.push('build-plugin-ice-ssr');
  }

  if (!userConfig.disableRuntime) {
    if (!Object.prototype.hasOwnProperty.call(userConfig, 'store') || userConfig.store !== false) {
      builtInPlugins.push('build-plugin-ice-store');
    }
  }

  return builtInPlugins;
};

export = getBuiltInPlugins
