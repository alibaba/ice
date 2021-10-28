import { getBabelPreset } from '@builder/babel-config';

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
