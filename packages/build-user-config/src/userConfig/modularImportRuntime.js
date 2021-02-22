const addBabelPlugins = require('./babelPlugins');

module.exports = (config, value, context, api) => {
  if (value) {
    addBabelPlugins(config, [[
      require.resolve('../utils/babelPluginImport'),
      {
        importDeclarations: api.getValue('importDeclarations'),
      },
    ]]);
  }
};
