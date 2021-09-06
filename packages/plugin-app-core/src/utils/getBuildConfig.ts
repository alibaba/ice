interface IBuildConfig {
  router?: object | boolean;
  store?: boolean;
  icestarkType?: 'es' | 'umd' | 'normal';
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

  if (vite) {
    buildConfig.icestarkType = 'es';
  }

  // eslint-disable-next-line no-nested-ternary
  buildConfig.icestarkType = vite ? 'es' : (isIcestarkUMD ? 'umd' : 'normal');

  return buildConfig;
}

export default getBuildConfig;
