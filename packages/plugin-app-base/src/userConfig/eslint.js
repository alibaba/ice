const path = require('path');

module.exports = (config, eslint, { rootDir }) => {
  if (typeof eslint === 'boolean' && eslint === false) {
    return config;
  }
  const { disable, ...args } = eslint;
  if (!disable) {
    const appSrc = path.join(rootDir, 'src');
    config.module
      .rule('eslint')
      .test(/\.(jsx?|tsx?)$/)
      .include
      .add(appSrc)
      .end()
      .enforce('pre')
      .use('eslint')
      .loader(require.resolve('eslint-loader'))
      .tap((options) => ({
        cache: true,
        eslintPath: require.resolve('eslint'),
        formatter: require.resolve('react-dev-utils/eslintFormatter'),
        ...options,
        ...args
      }));
  }
};
