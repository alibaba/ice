const path = require('path');

module.exports = (config, alias, context) => {
  const { rootDir } = context;
  const aliasWithRoot = {};
  Object.keys(alias).forEach((key) => {
    if (typeof alias[key] === 'boolean' || path.isAbsolute(alias[key])) {
      aliasWithRoot[key] = alias[key];
    } else {
      let resolvePath = '';
      try {
        // 检测是否可以在 node_modules 下找到依赖，如果可以直接使用该依赖
        if (require.resolve(alias[key], { paths: [rootDir]})) {
          resolvePath = alias[key];
        }
      } catch (e) {
        // ignore errors
      }
      aliasWithRoot[key] = resolvePath || path.resolve(rootDir, alias[key]);
    }
  });
  config.merge({
    resolve: {
      alias: aliasWithRoot,
    },
  });
};
