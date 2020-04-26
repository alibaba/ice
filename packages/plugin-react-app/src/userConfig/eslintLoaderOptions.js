const path = require('path');

module.exports = (config, eslintLoaderOptions) => {
  const { disable, ...args } = eslintLoaderOptions;
  if (!disable) {
    const appSrc = path.join(process.cwd(), 'src');
    config.module
      .rule('eslint')
      .test(/\.(jsx?|tsx?)$/)
      .include
        .add(appSrc)
        .end()
      .enforce('pre')
      .use('eslint')
        .loader('eslint-loader')
        .tap((options) => ({
            cache: true,
            eslintPath: require.resolve('eslint'),
            formatter: require.resolve('react-dev-utils/eslintFormatter'),
            ...options,
            ...args
          }));
  }
};
