/**
 * 编译设置
 * @param {Object} buildConfig 定义在 package.json 的字段
 */

function resolvePlugin(plugins) {
  return plugins.filter(Boolean).map((plugin) => {
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
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'entry',
          targets: {
            browsers: [
              'last 2 versions',
              'Firefox ESR',
              '> 1%',
              'ie >= 9',
              'iOS >= 8',
              'Android >= 4',
            ],
          },
        },
      ],
      '@babel/preset-react',
    ]),
    plugins: resolvePlugin([
      // Stage 0
      '@babel/plugin-proposal-function-bind',
      // Stage 1
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-logical-assignment-operators',
      ['@babel/plugin-proposal-optional-chaining', { loose: false }],
      ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
      ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
      '@babel/plugin-proposal-do-expressions',
      // Stage 2
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',
      // Stage 3
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-proposal-json-strings',
      process.env.INJECT_BABEL == 'runtime'
        ? [
            '@babel/plugin-transform-runtime',
            {
              corejs: false,
              helpers: true,
              regenerator: true,
              useESModules: false,
            },
          ]
        : null,
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
