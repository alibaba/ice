const checkPostcssLoader = (config, ruleName) =>
  config.module.rules.has(ruleName) &&
  config.module.rule(ruleName).uses.has('postcss-loader');

module.exports = (config, postcssOptions, context) => {
  if (!postcssOptions) {
    return;
  }

  const customPostcssOptions = { ...postcssOptions };

  const styleRules = [
    'css',
    'css-module',
    'css-global',
    'scss',
    'scss-module',
    'scss-global',
    'less',
    'less-module',
    'less-global',
  ];
  const { rootDir = '' } = context || {};
  let finalPostcssOptions = {};

  // get default postcss config
  if (checkPostcssLoader(config, 'css')) {
    const builtInOptions =
      config.module.rule('css').use('postcss-loader').get('options') || {};
    const { config: loaderConfigOptions } = builtInOptions;
    if (loaderConfigOptions && loaderConfigOptions.path) {
      try {
        const postcssFile = `${loaderConfigOptions.path}/defaultPostcssConfig`;
        finalPostcssOptions = {
          postcssOptions:
            (loaderConfigOptions.ctx
              ? // eslint-disable-next-line
                require(postcssFile)(loaderConfigOptions.ctx)
              : // eslint-disable-next-line
                require(postcssFile)) || {},
        };
      } catch (err) {
        console.log('[Error] fail to load default postcss config');
      }
    } else {
      finalPostcssOptions = builtInOptions;
    }

    // get plugins in different versions of postcss-loader
    let builtInPlugins = [];
    if (!finalPostcssOptions.postcssOptions) {
      // get plugins in v3
      builtInPlugins = [...(finalPostcssOptions.plugins || [])];
    } else {
      // get plugins in v5
      builtInPlugins = [...(finalPostcssOptions.postcssOptions.plugins || [])];
    }

    // merge plugins
    const finalPlugins = [...builtInPlugins];
    Object.keys(customPostcssOptions.plugins || {}).forEach((pluginName) => {
      let pluginOptions = {};
      const targetIndex = builtInPlugins.findIndex((pluginConfig) => {
        const [name, options] = Array.isArray(pluginConfig)
          ? pluginConfig
          : [pluginConfig];
        if (options) {
          pluginOptions = options;
        }
        return typeof name === 'string' && name.indexOf(pluginName) > -1;
      });
      const options = customPostcssOptions.plugins[pluginName];
      if (targetIndex > -1) {
        if (options === false) {
          // delete builtIn plugin
          finalPlugins.splice(targetIndex, 1);
        } else {
          // shallow merge for options
          const mergedOptions = { ...pluginOptions, ...options };
          finalPlugins.splice(targetIndex, 1, [pluginName, mergedOptions]);
        }
      } else {
        finalPlugins.push([pluginName, options]);
      }
    });
    delete customPostcssOptions.plugins;

    const postcssPlugins = finalPlugins.map((pluginInfo) => {
      const [name, options] = Array.isArray(pluginInfo)
        ? pluginInfo
        : [pluginInfo];
      if (typeof name === 'string') {
        const resolvePath = require.resolve(name, { paths: [rootDir] });
        // eslint-disable-next-line
        return require(resolvePath)(options);
      } else {
        return pluginInfo;
      }
    });

    if (!finalPostcssOptions.postcssOptions) {
      // set final postcss options in v3
      finalPostcssOptions = {
        ...finalPostcssOptions,
        ...customPostcssOptions,
        plugins: [...postcssPlugins],
      };
    } else {
      // set default value
      customPostcssOptions.postcssOptions =
        customPostcssOptions.postcssOptions || {};

      // modify option name `exec` to `execute` in v5
      if (customPostcssOptions.exec) {
        customPostcssOptions.execute = customPostcssOptions.exec;
        delete customPostcssOptions.exec;
      }

      const shouldMoveToPostcssOptionsKeys = [
        'parser',
        'syntax',
        'stringifier',
        'from',
        'to',
        'map',
      ];

      // move options to postcssOptions
      Object.keys(customPostcssOptions || {}).forEach((optionName) => {
        if (shouldMoveToPostcssOptionsKeys.includes(optionName)) {
          customPostcssOptions.postcssOptions[optionName] =
            customPostcssOptions[optionName];
          delete customPostcssOptions[optionName];
        }
      });

      // set final postcss options in v5
      finalPostcssOptions = {
        ...finalPostcssOptions,
        ...customPostcssOptions,
        postcssOptions: {
          ...finalPostcssOptions.postcssOptions,
          ...customPostcssOptions.postcssOptions,
          plugins: [...postcssPlugins],
        },
      };
    }

    // modify css rules
    styleRules.forEach((ruleName) => {
      if (checkPostcssLoader(config, ruleName)) {
        config.module
          .rule(ruleName)
          .use('postcss-loader')
          .tap(() => {
            // merge postcss-loader options
            return finalPostcssOptions;
          });
      }
    });
  }
};
