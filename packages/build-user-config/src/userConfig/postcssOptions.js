const checkPostcssLoader = (config, ruleName) => config.module.rules.has(ruleName) && config.module.rule(ruleName).uses.has('postcss-loader');

module.exports = (config, postcssOptions, context) => {
  if (postcssOptions) {
    const styleRules = ['css', 'css-module', 'css-global', 'scss', 'scss-module', 'scss-global', 'less', 'less-module', 'less-global'];
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
            finalPostcssOptions = {
              // eslint-disable-next-line
              postcssOptions: (optionConfig.ctx ? require(postcssFile)(optionConfig.ctx) : require(postcssFile)) || {}
            };
          } catch(err) {
            console.log('[Error] fail to load default postcss config');
          }
        } else {
          // compatible with rax config
          finalPostcssOptions = builtInOptions || {
            postcssOptions: {
              plugins: []
            }
          };
        }
      }
    }
    if (!finalPostcssOptions.postcssOptions) {
      // set default plugin value
      finalPostcssOptions.postcssOptions = {
        plugins: [],
      };
    }

    // merge plugins
    const { plugins = [] } = finalPostcssOptions.postcssOptions;
    const finalPlugins = [...plugins];
    Object.keys(postcssOptions.plugins || {}).forEach((pluginName) => {
      let pluginOptions = {};
      const targetIndex = plugins.findIndex((pluginConfig) => {
        const [name, options] = Array.isArray(pluginConfig) ? pluginConfig : [pluginConfig];
        if (options) {
          pluginOptions = options;
        }
        return typeof name === 'string' && name.indexOf(pluginName) > -1;
      });
      const options = postcssOptions.plugins[pluginName];
      if (targetIndex > -1) {
        if (options === false) {
          // delete builtIn plugin
          finalPlugins.splice(targetIndex, 1);
        } else {
          // shallow merge for options
          const mergedOptions = {...pluginOptions, ...options};
          finalPlugins.splice(targetIndex, 1, [pluginName, mergedOptions]);
        }
      } else {
        finalPlugins.push([pluginName, options]);
      }
    });
    const postcssPlugins = finalPlugins.map((pluginInfo) => {
      const [name, options] = Array.isArray(pluginInfo) ? pluginInfo : [pluginInfo];
      if (typeof name === 'string') {
        const resolvePath = require.resolve(name, { paths: [context.rootDir] });
        // eslint-disable-next-line
        return require(resolvePath)(options);
      } else {
        return pluginInfo;
      }
    });
    // remove k-v plugins options
    const originalPostcssOptions = {
      ...postcssOptions,
    };
    delete originalPostcssOptions.plugins;

    // concat plugins from `build.json` when `postcss-loader` is v3.0.0
    // postcss-loader v3.0.0 options => { plugins: [...] }
    // postcss-loader v5.3.0 options => { postcssOptions: { plugins: [...] } }
    finalPostcssOptions.plugins = (finalPostcssOptions.plugins || []).concat(postcssPlugins);

    // modify css rules
    styleRules.forEach((ruleName) => {
      if (checkPostcssLoader(config, ruleName)) {
        config.module.rule(ruleName).use('postcss-loader').tap(() => {
          // merge postcss-loader options
          return {
            ...restLoaderOptions,
            ...finalPostcssOptions,
            postcssOptions: {
              ...finalPostcssOptions.postcssOptions,
              ...originalPostcssOptions,
              plugins: postcssPlugins,
            }
          };
        });
      }
    });
  }
};
