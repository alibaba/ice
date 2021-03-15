const minifyOptions = [
  'ecma', 'parse', 'compress', 'mangle', 'module', 'format', 'output', 'sourceMap', 'toplevel', 'nameCache', 'ie8', 'keep_classnames', 'keep_fnames', 'safari10',
];

module.exports = (config, customOptions, context) => {
  const { command } = context;
  if (command === 'build' && customOptions && config.optimization.minimizers.get('TerserPlugin')) {
    config.optimization.minimizer('TerserPlugin').tap(([options]) => {
      if (customOptions.terserOptions) {
        // compatible with `{"terserOptions": {"terserOptions": {}}}`
        console.log('[WARNING]:options is not valid visit https://ice.work/docs/guide/basic/build#terserOptions for more details');
        return [{
          ...options,
          ...customOptions,
          terserOptions: {
            ...(options.terserOptions || {}),
            ...customOptions.terserOptions,
          },
        }];
      } else {
        const terserOptions = {...(options.terserOptions || {})};
        Object.keys(customOptions).forEach((optionKey) => {
          if (minifyOptions.includes(optionKey)) {
            terserOptions[optionKey] = customOptions[optionKey];
            delete customOptions[optionKey];
          }
        });
        return [{
          ...options,
          ...customOptions,
          terserOptions,
        }];
      }
    });
  }
};