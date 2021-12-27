import getBabelPreset from './preset-ice';

export { getBabelPreset };
export default () => {
  return getBabelPreset({
    react: {},
    typescript: true,
    env: {
      modules: false,
      useBuiltIns: 'entry',
      // Set latest polyfills (until ECMAScript 2021). https://unpkg.alibaba-inc.com/browse/core-js-compat@3.18.3/modules-by-versions.json
      corejs: '3.7',
    }
  });
};
