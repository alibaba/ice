const { injectBabelPlugin } = require('react-app-rewired');
const WebpackPluginImport = require('webpack-plugin-import');
const rewireSass = require('./rewire-scss');

module.exports = function override(config) {
  config = injectBabelPlugin(
    ['import', { libraryName: '@icedesign/base' }],
    config
  );

  config.plugins.push(
    new WebpackPluginImport([
      {
        libraryName: /^@icedesign\/base\/lib\/([^/]+)/,
        stylePath: 'style.js',
      },
      {
        libraryName: /@icedesign\/.*/,
        stylePath: 'style.js',
      },
    ])
  );

  config = rewireSass(config);

  return config;
};
