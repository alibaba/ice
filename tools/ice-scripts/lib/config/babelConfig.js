const babelPluginIce = require.resolve('../../dependencies/babel-plugin-ice');

module.exports = {
  babelrc: false,
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
            'Android >= 4'
          ]
        }
      }
    ],
    require.resolve('babel-preset-react'),
    require.resolve('babel-preset-stage-0')
  ],
  plugins: [
    require.resolve('babel-plugin-transform-decorators-legacy'),
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-transform-es2015-object-super'),
    [babelPluginIce, { libraryName: '@ali/ice' }],
    [babelPluginIce, { libraryName: '@alife/next' }],
    [babelPluginIce, { libraryName: '@icedesign/base' }],
  ]
};
