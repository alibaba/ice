import * as path from 'path';

interface Json {
  [index: string]: unknown;
}

type Plugins = string | [string, Json];

// Babel plugins list for jsx plus
const babelPlugins: Plugins[] = [
  'babel-plugin-transform-jsx-list',
  'babel-plugin-transform-jsx-condition',
  'babel-plugin-transform-jsx-memo',
  'babel-plugin-transform-jsx-slot',
  ['babel-plugin-transform-jsx-fragment', { moduleName: 'react' }],
  'babel-plugin-transform-jsx-class',
];

export default ({ context, onGetWebpackConfig, modifyUserConfig }) => {
  const { userConfig: { vite } } = context;

  if (vite) {
    modifyUserConfig('babelPlugins', babelPlugins, { deepmerge: true });
    return;
  }

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
