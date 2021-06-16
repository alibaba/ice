module.exports = (config, postcssrc) => {
  if (postcssrc) {
    // remove postcss-loader options, use postcss config file
    [
      'scss',
      'scss-module',
      'css',
      'css-module',
      'less',
      'less-module',
    ].forEach(rule => {
      if (
        config.module.rules.has(rule) &&
        config.module.rule(rule).uses.has('postcss-loader')
      ) {
        config.module
          .rule(rule)
          .use('postcss-loader')
          .tap(() => ({}));
      }
    });
  }
};
