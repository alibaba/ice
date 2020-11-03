const { getJestConfig } = require('build-scripts-config');
const logWebpackConfig = require('./utils/logWebpackConfig');

module.exports = (api) => {
  const { onHook, onGetJestConfig, context } = api;
  const { rootDir } = context;

  onHook('before.test.run', ({ config }) => {
    logWebpackConfig(config);
  });

  onGetJestConfig((jestConfig) => {
    const { moduleNameMapper, ...rest } = jestConfig;

    Object.keys(moduleNameMapper).forEach(key => {
      // escape $ in the beginning. because $ match the end position end in regular expression
      // '^$ice/history$' -> '^\$ice/history$'
      if (key.indexOf('^$') === 0) {
        const newKey = `^\\${key.slice(1)}`;
        moduleNameMapper[newKey] = moduleNameMapper[key];
        delete moduleNameMapper[key];
      };
    });

    const defaultJestConfig = getJestConfig({ rootDir, moduleNameMapper });
    return {
      ...defaultJestConfig,
      ...rest,
      // defaultJestConfig.moduleNameMapper already combine jestConfig.moduleNameMapper
      moduleNameMapper: defaultJestConfig.moduleNameMapper,
    };
  });
};
