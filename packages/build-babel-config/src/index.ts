import getBabelPreset from './preset-ice';

export default () => {
  return getBabelPreset({
    react: {},
    typescript: true,
    env: {
      modules: false,
      useBuiltIns: 'entry',
      corejs: 3,
    }
  });
};
