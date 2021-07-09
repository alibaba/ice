const addBabelPlugins = require('./babelPlugins');
const addSwcPlugins = require('../utils/addSwcPlugins');

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
