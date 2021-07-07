const defaultConfig = {
  plugins: [['postcss-preset-env', {
    // Without any configuration options, PostCSS Preset Env enables Stage 2 features.
    stage: 3,
    browsers: [
      'last 2 versions',
      'Firefox ESR',
      '> 1%',
      'ie >= 9',
      'iOS >= 8',
      'Android >= 4',
    ],
  }]],
};

module.exports = defaultConfig;