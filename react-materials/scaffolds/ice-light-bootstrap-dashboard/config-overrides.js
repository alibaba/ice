const { injectBabelPlugin } = require('react-app-rewired');
const WebpackPluginImport = require('webpack-plugin-import');
const rewireSass = require('./rewire-scss');

module.exports = function override(config) {

  config = rewireSass(config);

  return config;
};
