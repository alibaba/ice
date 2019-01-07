function createResolve(type) {
  return (name) => require.resolve(`babel-${type}-${name}`);
}

function resolvePlugin(plugins) {
  return plugins.map((plugin) => {
    if (Array.isArray(plugin)) {
      const [pluginName, ...args] = plugin;
      return [require.resolve(pluginName), ...args];
    }
    return require.resolve(plugin);
  });
}

module.exports = function getBabelrc() {
  return {
    babelrc: false,
    presets: ['es2015', 'stage-0', 'react'].map(createResolve('preset')),
    plugins: resolvePlugin([
      'babel-plugin-transform-decorators-legacy',
      [
        'babel-plugin-component',
        { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' },
      ],
      [
        'babel-plugin-import',
        [
          { libraryName: '@icedesign/base' },
          { libraryName: '@alife/next' },
          { libraryName: '@alifd/next' },
        ],
      ]
    ]),
  };
};
