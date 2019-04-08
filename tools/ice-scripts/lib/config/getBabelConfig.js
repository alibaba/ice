/**
 * 编译设置
 * @param {Object} buildConfig 定义在 package.json 的字段
 */
const cliInstance = require('../utils/cliInstance');

function resolvePlugin(plugins) {
  return plugins.filter(Boolean).map((plugin) => {
    if (Array.isArray(plugin)) {
      const [pluginName, ...args] = plugin;
      return [require.resolve(pluginName), ...args];
    }
    return require.resolve(plugin);
  });
}

module.exports = (buildConfig = {}, buildComponentSrc) => {
  let importConfig = [{
    libraryName: '@icedesign/base',
  }, {
    libraryName: '@alife/next',
  }, {
    libraryName: '@alifd/next',
  }];
  const customImportConfig = buildConfig.babelPluginImportConfig;

  if (customImportConfig) {
    if (Array.isArray(customImportConfig)) {
      importConfig = importConfig.concat(customImportConfig);
    } else {
      importConfig.push(customImportConfig);
    }
  }

  let plugins = [
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
    (cliInstance.get('injectBabel') === 'runtime' || buildComponentSrc) ? [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ] : null,
  ];

  plugins = plugins.concat(
    importConfig.map((itemConfig) => {
      return ['babel-plugin-import', itemConfig, itemConfig.libraryName];
    })
  );

  console.log(222, plugins);

  return {
    babelrc: buildConfig.babelrc || false,
    presets: resolvePlugin([
      [
        '@babel/preset-env',
        {
          modules: buildComponentSrc ? 'commonjs' : false,
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
    plugins: resolvePlugin(plugins),
  };
};
