interface IBuildConfig {
  router?: object | boolean;
  store?: boolean;
  icestarkType?: 'es' | 'umd' | 'normal';
  locale?: object;
  web?: object;
}

function getBuildConfig(userConfig): IBuildConfig{
  const { plugins, vite } = userConfig;
  const buildConfig: IBuildConfig = {};
  // filter userConfig
  ['router', 'store', 'web'].forEach((configKey) => {
    if (Object.prototype.hasOwnProperty.call(userConfig, configKey)) {
      buildConfig[configKey] = userConfig[configKey];
    }
  });

  const isIcestarkUMD = plugins && plugins.some(plugin => {
    if (Array.isArray(plugin)) {
      const [pluginName, pluginOptions] = plugin;
      return pluginName === 'build-plugin-icestark' && pluginOptions?.umd;
    }
    return false;
  });

  // eslint-disable-next-line no-nested-ternary
  buildConfig.icestarkType = vite ? 'es' : (isIcestarkUMD ? 'umd' : 'normal');

  let localeConfig;
  if (plugins && Array.isArray(plugins)) {
    plugins.forEach((plugin) => {
      if (Array.isArray(plugin)) {
        const [pluginName, pluginOptions] = plugin;
        if (pluginName === 'build-plugin-ice-locale') {
          localeConfig = pluginOptions;
        }
      }
    });
  }
  if (localeConfig) {
    buildConfig.locale = localeConfig;
  }

  return buildConfig;
}

export default getBuildConfig;
