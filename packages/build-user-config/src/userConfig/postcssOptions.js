const checkPostcssLoader = (config, ruleName) => config.module.rules.has(ruleName) && config.module.rule(ruleName).uses.has('postcss-loader');

module.exports = (config, postcssOptions) => {
  if (postcssOptions) {
    const styleRules = ['css', 'css-module', 'scss', 'scss-module', 'less', 'less-module'];
    let finalPostcssOptions = {};
    let restLoaderOptions = {};
    // get default post css config
    if (checkPostcssLoader(config, 'css')) {
      const builtInOptions = config.module.rule('css').use('postcss-loader').get('options');
      if (builtInOptions) {
        const { config: optionConfig, ...restOptions } = builtInOptions;
        if (restOptions) {
          restLoaderOptions = restOptions;
        }
        if (builtInOptions.config && builtInOptions.config.path) {
          try {
            const postcssFile = `${optionConfig.path}/defaultPostcssConfig`;
            // eslint-disable-next-line
            finalPostcssOptions = (optionConfig.ctx ? require(postcssFile)(optionConfig.ctx) : require(postcssFile)) || {};
          } catch(err) {
            console.log('[Error] fail to load default postcss config');
          }
        } else {
          // compatible with rax config
          finalPostcssOptions = builtInOptions || { plugins: []};
        } 
      }
    }
    if (!finalPostcssOptions.plugins) {
      // set default plugin value
      finalPostcssOptions.plugins = [];
    }

    // merge plugins
    const { plugins } = finalPostcssOptions;
    Object.keys(postcssOptions.plugins || {}).forEach((pluginName) => {
      let pluginOptions = {};
      const targetIndex = plugins.findIndex((pluginConfig) => {
        const [name, options] = Array.isArray(pluginConfig) ? pluginConfig : [pluginConfig];
        if (options) {
          pluginOptions = options;
        }
        return typeof name === 'string' && name === pluginName;
      });
      const options = postcssOptions.plugins[pluginName];
      if (targetIndex > -1) {
        if (options === false) {
          // delete builtIn plugin
          finalPostcssOptions.plugins.splice(targetIndex, 1);
        } else {
          // shallow merge for options
          const mergedOptions = {...pluginOptions, ...options};
          finalPostcssOptions.plugins.splice(targetIndex, 1, [pluginName, mergedOptions]);
        }
      } else {
        finalPostcssOptions.plugins.push([pluginName, options]);
      }
    });
    const postcssPlugins = finalPostcssOptions.plugins.map((pluginInfo) => {
      const [name, options] = Array.isArray(pluginInfo) ? pluginInfo : [pluginInfo];
      if (typeof name === 'string') {
        // eslint-disable-next-line
        return require(name)(options);
      } else {
        return pluginInfo;
      }
    });
    // modify css rules
    styleRules.forEach((ruleName) => {
      if (checkPostcssLoader(config, ruleName)) {
        config.module.rule(ruleName).use('postcss-loader').tap(() => {
          // merge postcss-loader options
          return {
            ...restLoaderOptions,
            ...postcssOptions,
            ...finalPostcssOptions,
            plugins: postcssPlugins,
          };
        });
      }
    });
  }
};
