const { getSassImplementation } = require('@builder/app-helpers');

module.exports = (config, customOptions, context) => {
  const { pkg, rootDir } = context;
  let sassLoaderOptions = {};
  let defaultSassImplPkg = 'sass';
  if ((pkg.dependencies && pkg.dependencies['node-sass']) || (pkg.devDependencies && pkg.devDependencies['node-sass'])) {
    defaultSassImplPkg = 'node-sass';
  }
  sassLoaderOptions.implementation = getSassImplementation(defaultSassImplPkg, rootDir);
  if (customOptions) {
    sassLoaderOptions = { ...sassLoaderOptions, ...customOptions };
  }
  [
    'scss',
    'scss-module',
  ].forEach(rule => {
    if (config.module.rules.get(rule)) {
      config.module
        .rule(rule)
        .use('sass-loader')
        .tap((options) => ({
          ...options,
          ...sassLoaderOptions,
        }));
    }
  });
};