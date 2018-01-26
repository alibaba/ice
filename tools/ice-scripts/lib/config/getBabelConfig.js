const babelPluginIce = require.resolve('../../dependencies/babel-plugin-ice');
/**
 * 编译设置
 * @param {Object} buildConfig 定义在 package.json 的字段
 */
module.exports = (buildConfig = {}) => {
  return {
    babelrc: buildConfig.babelrc || false,
    presets: [
      [
        require.resolve('babel-preset-env'),
        {
          modules: 'commonjs',
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
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-stage-0'),
    ],
    plugins: [
      require.resolve('babel-plugin-transform-decorators-legacy'),
      require.resolve('babel-plugin-add-module-exports'),
      require.resolve('babel-plugin-transform-es2015-object-super'),
      [require.resolve('babel-plugin-transform-runtime'), {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: 'babel-runtime',
      }],
      [babelPluginIce, { libraryName: '@ali/ice' }],
      [babelPluginIce, { libraryName: '@alife/next' }],
      [babelPluginIce, { libraryName: '@icedesign/base' }],
    ],
  };
};
