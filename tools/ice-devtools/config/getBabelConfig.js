/**
 * 编译设置
 * @param {Object} buildConfig 定义在 package.json 的字段
 */

function resolvePlugin(plugins) {
  return plugins.map((plugin) => {
    if (Array.isArray(plugin)) {
      const [pluginName, ...args] = plugin;
      return [require.resolve(pluginName), ...args];
    }
    return require.resolve(plugin);
  });
}

module.exports = (buildConfig = {}) => {
  return {
    babelrc: buildConfig.babelrc || false,
    presets: resolvePlugin([
      '@babel/preset-env',
      '@babel/preset-react',
    ]),
    plugins: resolvePlugin([
      [
        'babel-plugin-import',
        { libraryName: '@icedesign/base' },
        '@icedesign/base',
      ],
      ['babel-plugin-import', { libraryName: '@alife/next' }, '@alife/next'],
      ['babel-plugin-import', { libraryName: '@alifd/next' }, '@alifd/next'],
    ]),
  };
};
