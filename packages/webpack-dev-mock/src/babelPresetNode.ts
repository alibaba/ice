import getBabelPreset from '@builder/babel-preset-ice';

export default () => {
  return getBabelPreset({
    env: {
      targets: {
        node: 'current',
      },
      modules: 'commonjs',
    },
    typescript: true
  });
};
