const addBabelPlugins = require('./babelPlugins');

module.exports = (config, value, context, api) => {
  const { userConfig: { swc } } = context;
  if (swc) return;
  if (value) {
    addBabelPlugins(config, [[
      require.resolve('../utils/babelPluginImport'),
      {
        importDeclarations: api.getValue('importDeclarations'),
      },
    ]]);
  }
};
