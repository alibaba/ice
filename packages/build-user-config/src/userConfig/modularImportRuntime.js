const path = require('path');
const addBabelPlugins = require('./babelPlugins');

module.exports = (config, value, context, api) => {
  const { rootDir, userConfig: { swc } } = context;
  if (value) {
    const importDeclarations = api.getValue('importDeclarations') || {};
    const framework = api.getValue('FRAMEWORK') === 'react' ? 'ice' : 'rax-app';

    if (swc) {
      const redirects = Object.keys(importDeclarations).map((name) => ({
        name,
        ...importDeclarations[name]
      }));

      config.module.rule('redirect-path-loader')
        .test(filePath => filePath.includes(path.join(rootDir, 'src')))
        .use('redirect-path-loader')
        .loader(require.resolve(path.join(__dirname, '../Loaders/RedirectPathLoader')))
        .options({
          [framework]: redirects,
        });
    } else {
      const pluginOptions = {
        importDeclarations,
        framework,
      };
      addBabelPlugins(config, [[
        require.resolve('../utils/babelPluginImport'),
        pluginOptions,
      ]], context);
    }
  }
};
