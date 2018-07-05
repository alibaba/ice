const babelPluginImport = require('babel-plugin-import').default;

/**
 * 编译设置
 * @param {Object} buildConfig 定义在 package.json 的字段
 */
module.exports = (buildConfig = {}) => {
  return {
    babelrc: buildConfig.babelrc || false,
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          modules: false,
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
      require.resolve('@babel/preset-react'),
      [require.resolve('@babel/preset-stage-0'), { decoratorsLegacy: true }],
    ],
    plugins: [
      require.resolve('babel-plugin-transform-es2015-object-super'),
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      [
        require.resolve('@babel/plugin-proposal-class-properties'),
        { loose: true },
      ],
      [
        require.resolve('@babel/plugin-transform-runtime'),
        {
          helpers: false,
          polyfill: true,
          regenerator: true,
          moduleName: 'babel-runtime',
        },
      ],
      [babelPluginImport, { libraryName: '@icedesign/base' }, '@icedesign/base'],
      [babelPluginImport, { libraryName: '@alife/next' }, '@alife/next'],
      [babelPluginImport, { libraryName: '@alifd/next' }, '@alifd/next'],
    ],
  };
};
