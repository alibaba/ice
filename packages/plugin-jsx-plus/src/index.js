const path = require('path');

// Babel plugins list for jsx plus
const babelPlugins = [
  'babel-plugin-transform-jsx-list',
  'babel-plugin-transform-jsx-condition',
  'babel-plugin-transform-jsx-memo',
  'babel-plugin-transform-jsx-slot',
  ['babel-plugin-transform-jsx-fragment', { moduleName: 'react' }],
  'babel-plugin-transform-jsx-class',
];

module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig(config => {
    // modify babel config to add jsx plus plugins
    ['jsx', 'tsx'].forEach(rule => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap(options => {
          babelPlugins.forEach(plugin => {
            if (typeof plugin === 'string') {
              options.plugins.push(require.resolve(plugin));
            } else if (Array.isArray(plugin)) {
              const [pluginName, pluginOption] = plugin;
              options.plugins.push([require.resolve(pluginName), pluginOption]);
            }
          });
          return options;
        })
        .after('ts-loader');
    });

    // add resolve modules for babel-runtime-jsx-plus
    const runtimePath = require.resolve('babel-runtime-jsx-plus');
    const pathArr = runtimePath.split('node_modules');
    pathArr.pop(); // pop file path
    config.resolve.modules.add(path.join(pathArr.join('node_modules'), 'node_modules'));
  });
};
