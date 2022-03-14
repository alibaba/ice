module.exports = (config, postcssrc) => {
  if (postcssrc) {
    // remove postcss-loader options, use postcss config file
    [
      'scss',
      'scss-module',
      'scss-global',
      'css',
      'css-module',
      'css-global',
      'less',
      'less-module',
      'less-global',
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
