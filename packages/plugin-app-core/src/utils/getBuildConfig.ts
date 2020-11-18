interface IBuildConfig {
  router?: object;
  store?: boolean;
  icestarkUMD?: boolean;
}

function getBuildConfig(userConfig): IBuildConfig{
  const { plugins } = userConfig;
  const buildConfig: IBuildConfig = {};
  // filter userConfig
  ['router', 'store'].forEach((configKey) => {
    if (Object.prototype.hasOwnProperty.call(userConfig, configKey)) {
      buildConfig[configKey] = userConfig[configKey];
    }
  });
  // get icestark umd config
  buildConfig.icestarkUMD = plugins && !!plugins.find((plugin) => {
    if (Array.isArray(plugin)) {
      const [pluginName, pluginOptions] = plugin;
      return pluginName === 'build-plugin-icestark' && pluginOptions?.umd;
    }
    return false;
  });
  return buildConfig;
}

export default getBuildConfig;
