const addBabelPlugins = require('./babelPlugins');

module.exports = (config, value, context, api) => {
  // TODO use swc plugin
  if (context.userConfig.swc) return;
  if (value) {
    addBabelPlugins(config, [[
      require.resolve('../utils/babelPluginImport'),
      {
        importDeclarations: api.getValue('importDeclarations'),
      },
    ]], context);
  }
};
