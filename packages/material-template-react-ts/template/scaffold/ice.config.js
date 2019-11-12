const path = require('path');

module.exports = {
  entry: 'src/index.ts',
  publicPath: './',
  alias: {
    '@': path.resolve(__dirname, './src/'),
  },
  plugins: [
    ['ice-plugin-fusion', {
      themePackage: '@icedesign/theme',
    }],
    ['ice-plugin-moment-locales', {
      locales: ['zh-cn'],
    }],
  ],
  chainWebpack: (config) => {
    // support css modules in ts
    ['scss-module'].forEach((rule) => {
      if (config.module.rules.get(rule)) {
        config.module.rule(rule).use('ts-css-module-loader')
          .loader(require.resolve('css-modules-typescript-loader'))
          .options({ modules: true, sass: true });
        // 指定应用loader的位置
        config.module.rule(rule).use('ts-css-module-loader').before('css-loader');
      }
    });
  },
};
