function createResolve(type) {
  return (name) => require.resolve(`babel-${type}-${name}`);
}

module.exports = function getBabelrc() {
  return {
    presets: ['es2015', 'stage-0', 'react'].map(createResolve('preset')),
    plugins: [
      [
        require.resolve('babel-plugin-component'),
        {
          libraryName: 'element-ui',
          styleLibraryName: 'theme-chalk',
        },
      ],
    ],
  };
};
