interface I18nConfig {
  locales: string[];
  defaultLocale: string;
  redirect?: true;
  i18nRouting?: false;
}

interface IBuildConfig {
  router?: object | boolean;
  store?: boolean;
  icestarkType?: 'es' | 'umd' | 'normal';
  i18n?: I18nConfig;
  web?: object;
  mpa?: boolean;
}

function getBuildConfig(userConfig): IBuildConfig{
  const { plugins, vite } = userConfig;
  const buildConfig: IBuildConfig = {
    mpa: Boolean(userConfig.mpa),
  };

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

  let i18nConfig;
  if (plugins && Array.isArray(plugins)) {
    plugins.forEach((plugin) => {
      if (Array.isArray(plugin)) {
        const [pluginName, pluginOptions] = plugin;
        if (pluginName === 'build-plugin-ice-i18n') {
          i18nConfig = pluginOptions;
        }
      }
    });
  }
  if (i18nConfig) {
    buildConfig.i18n = i18nConfig;
  }

  return buildConfig;
}

export default getBuildConfig;
