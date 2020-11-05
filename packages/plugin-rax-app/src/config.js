const { validation } = require('build-app-helpers');

/* eslint global-require: 0 */
module.exports = [
  {
    name: 'devServer',
    defaultValue: {
      // For mutilple task, web will occupy the server root route
      writeToDisk: true,
      historyApiFallback: true,
    }
  },
  {
    name: 'outputAssetsPath',
    defauleValue: {
      js: '',
      css: '',
    }
  },
  {
    name: 'inlineStyle',
    defaultValue: false,
    configWebpack: require('./userConfig/inlineStyle'),
    validation: 'boolean'
  }
];
