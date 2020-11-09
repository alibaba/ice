const path = require('path');

module.exports = (config, alias, context) => {
  const { rootDir } = context;
  const aliasWithRoot = {};
  Object.keys(alias).forEach((key) => {
    if (path.isAbsolute(alias[key])) {
      aliasWithRoot[key] = alias[key];
    } else {
      aliasWithRoot[key] = path.resolve(rootDir, alias[key]);
    }
  });
  config.merge({
    resolve: {
      alias: aliasWithRoot,
    },
  });
};
