module.exports = () => ({
  plugins: [
    ['postcss-preset-env', {
      browsers: [
        'last 2 versions',
        'Firefox ESR',
        '> 1%',
        'ie >= 9',
        'iOS >= 8',
        'Android >= 4',
      ],
    }],
  ],
});
