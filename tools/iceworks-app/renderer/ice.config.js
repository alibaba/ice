const path = require('path');

module.exports = {
  entry: 'src/index.jsx',
  publicPath: './',
  plugins: [
    ['ice-plugin-fusion', {
      themePackage: '@icedesign/theme',
    }],
    ['ice-plugin-moment-locales', {
      locales: ['zh-cn'],
    }],
    ['ice-plugin-multi-pages'],
  ],
  alias: {
    '@': path.resolve(__dirname, './src/'),
  },
};
