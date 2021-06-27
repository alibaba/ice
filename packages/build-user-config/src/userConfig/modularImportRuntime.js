const addBabelPlugins = require('./babelPlugins');
const addSwcPlugins = require('../utils/addSwcPlugins');

module.exports = (config, value, context, api) => {
  if (value) {
    const pluginOptions = {
      importDeclarations: api.getValue('importDeclarations'),
    };
    if (context.userConfig.swc) {
      addSwcPlugins(config, [[
        require.resolve('../utils/swcPluginImport'),
        pluginOptions,
      ]]);
    } else {
      addBabelPlugins(config, [[
        require.resolve('../utils/babelPluginImport'),
        pluginOptions,
      ]]);
    };
  }
};
