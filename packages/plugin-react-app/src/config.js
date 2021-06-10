/* eslint global-require: 0 */
module.exports = function(userConfig) {
  let polyfillDefaultValue = 'entry';
  if (Object.prototype.hasOwnProperty.call(userConfig, 'injectBabel') && userConfig.injectBabel === false) {
    polyfillDefaultValue = false;
  }
  return [
    {
      name: 'remoteRuntime',
      defaultValue: false,
      validation: 'boolean|object'
    },
    {
      name: 'moduleFederation',
      defaultValue: false,
      configWebpack: require('./userConfig/moduleFederation').default,
      validation: 'boolean|object',
    },
    {
      name: 'entry',
      defaultValue: 'src/index.jsx',
      configWebpack: require('./userConfig/entry'),
      validation: 'string|array|object',
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
      name: 'injectBabel',
      defaultValue: 'polyfill',
      validation: 'string|boolean'
    },
    {
      name: 'polyfill',
      defaultValue: polyfillDefaultValue
    }
  ];
};
