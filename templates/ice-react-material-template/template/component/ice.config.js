module.exports = {
  injectBabel: 'runtime',
  publicPath: './',
  plugins: [
    'ice-plugin-fusion',
    'ice-plugin-component',
    ['ice-plugin-moment-locales', {
      locales: ['zh-cn'],
    }],
  ],
};
