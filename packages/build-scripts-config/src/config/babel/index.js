const getBabelPreset = require('@builder/babel-preset-ice').default;

module.exports = () => {
  return getBabelPreset({
    react: {
      development: process.env.NODE_ENV === 'development',
    },
    typescript: true,
    env: {
      modules: false,
      useBuiltIns: 'entry',
      corejs: 3,
    }
  });
};
