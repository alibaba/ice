/* eslint global-require: 0 */
module.exports = function() {
  return [
    {
      name: 'vite',
      defaultValue: false,
      validation: 'boolean|object'
    },
    {
      name: 'cssChunkNames',
      defaultValue: '',
      validation: 'string|object',
    },
    {
      name: 'vitePlugins',
      defaultValue: [],
      validation: 'array',
    },
    {
      name: 'logging',
      defaultValue: {},
      validation: 'object'
    },
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
      name: 'polyfill',
      defaultValue: 'entry'
    },
    {
      name: 'fastRefresh',
      defaultValue: true,
      validation: 'boolean',
      configWebpack: require('./userConfig/fastRefresh'),
    },
    {
      name: 'optimizeRuntime',
      defaultValue: true,
      validation: 'boolean',
    },
  ];
};
