const getBuiltInPlugins = (userConfig) => {
  // built-in plugins for icejs
  const builtInPlugins = [
    'build-plugin-ice-core',
    'build-plugin-react-app',
    'build-plugin-ice-router',
    'build-plugin-ice-store',
    'build-plugin-ice-helpers',
    'build-plugin-ice-logger',
    'build-plugin-ice-config',
    'build-plugin-ice-request'
  ]

  return builtInPlugins.filter(plugin => {
    if (plugin === 'build-plugin-ice-store' && userConfig.store === false) {
      return false
    }
    return true
  })
}

export = getBuiltInPlugins
