const { validation } = require('@builder/app-helpers');

/* eslint global-require: 0 */
module.exports = function() {
  return [
    {
      name: 'entry',
      defaultValue: 'src/index.jsx',
      configWebpack: require('./userConfig/entry'),
      validation: (val) => {
        // entry: string | array
        // entry : { [name]: string | array }
        return validation('entry', val, 'string|array|object');
      },
    },
    {
      name: 'ignoreHtmlTemplate',
      defaultValue: false,
      configWebpack: require('./userConfig/ignoreHtmlTemplate'),
      validation: 'boolean',
    },
    {
      name: 'outputDir',
      defaultValue: 'build',
      configWebpack: require('./userConfig/outputDir'),
      validation: 'string'
    },
    {
      name: 'polyfill',
      defaultValue: 'entry'
    },
    {
      name: 'fastRefresh',
      defaultValue: true,
      validation: 'boolean'
    }
  ];
};
