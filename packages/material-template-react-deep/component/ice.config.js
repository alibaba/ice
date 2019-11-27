module.exports = {
  injectBabel: 'runtime',
  publicPath: './',
  plugins: [
    ['ice-plugin-fusion', {
      themePackage: '@alife/theme-97',
      nextLibDir: 'lib',
      style: false
    }],
    'ice-plugin-component',
    ['ice-plugin-moment-locales', {
      locales: ['zh-cn'],
    }],
  ],
};
