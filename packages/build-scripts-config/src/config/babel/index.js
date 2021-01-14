const getBabelPreset = require('@builder/babel-preset-ice').default;

module.exports = () => {
  return getBabelPreset({
    react: true,
    typescript: true,
    env: {
      modules: false,
      useBuiltIns: 'entry',
      corejs: 3,
    }
  });
};
