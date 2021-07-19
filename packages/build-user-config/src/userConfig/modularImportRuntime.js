const addBabelPlugins = require('./babelPlugins');

module.exports = (config, value, context, api) => {
  if (context.userConfig.swc) return;
  if (value) {
    const pluginOptions = {
      importDeclarations: api.getValue('importDeclarations'),
    };
    addBabelPlugins(config, [[
      require.resolve('../utils/babelPluginImport'),
      pluginOptions,
    ]], context);
  }
};
