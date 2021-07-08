const { getLessImplementation } = require('@builder/app-helpers');

const lessSpecificOptions = ['paths', 'rootpath', 'rewriteUrls',
 'math', 'strictMath', 'relativeUrls', 'strictUnits', 'ieCompat', 'javascriptEnabled',
'globalVars', 'modifyVars', 'urlArgs', 'dumpLineNumbers'];

module.exports = (config, customOptions, context) => {
  const { rootDir } = context;
  let lessLoaderOptions = {
    implementation: getLessImplementation(rootDir),
  };
  const lessOptions = {};

  if (customOptions) {
    const customOptionKeys = Object.keys(customOptions);
    customOptionKeys.forEach(key => {
      if (lessSpecificOptions.includes(key)) {
        lessOptions[key] = customOptions[key];
        delete customOptions[key];
      }
    });

    if (customOptions.lessOptions) {
      const originalLessOptions = lessLoaderOptions.lessOptions;
      delete customOptions.lessOptions;
      lessLoaderOptions.lessOptions = function(...args) {
        if (typeof originalLessOptions === 'function') {
          return {
            ...lessOptions,
            ...lessOptions.apply(this, args)
          };
        }
        return {
          ...lessOptions,
          ...originalLessOptions
        };
      };
    } else {
      lessLoaderOptions.lessOptions = lessOptions;
    }
    lessLoaderOptions = { ...lessLoaderOptions, ...customOptions };
  }

  [
    'less',
    'less-module',
    'less-global', // rule of `global.less`
  ].forEach(rule => {
    if (config.module.rules.get(rule)) {
      config.module
        .rule(rule)
        .use('less-loader')
        .tap((options) => ({
          ...options,
          ...lessLoaderOptions,
          // merge less options
          lessOptions: {
            ...(options.lessOptions || {}),
            ...lessLoaderOptions.lessOptions,
          }
        }));
    }
  });
};
