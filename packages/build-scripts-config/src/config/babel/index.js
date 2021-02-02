const getBabelPreset = require('@builder/babel-preset-ice').default;

module.exports = () => {
  const hasJsxRuntime = (() => {
    if (process.env.DISABLE_JSX_TRANSFORM === 'true') {
      return false;
    }
    try {
      require.resolve('react/jsx-runtime');
      return true;
    } catch (e) {
      return false;
    }
  })();

  return getBabelPreset({
    react: {
      development: process.env.NODE_ENV === 'development',
      runtime: hasJsxRuntime ? 'automatic' : 'classic',
    },
    typescript: true,
    env: {
      modules: false,
      useBuiltIns: 'entry',
      corejs: 3,
    }
  });
};
