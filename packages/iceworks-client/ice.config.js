const { resolve } = require('path');

module.exports = {
  alias: {
    '@src': resolve(__dirname, 'src/'),
    '@layouts': resolve(__dirname, 'src/layouts/'),
    '@components': resolve(__dirname, 'src/components/'),
    '@utils': resolve(__dirname, 'src/utils/'),
    '@hooks': resolve(__dirname, 'src/hooks'),
    '@stores': resolve(__dirname, 'src/stores/'),
  },

  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  },

  plugins: [
    ['ice-plugin-fusion', {
      // themePackage: '@alifd/theme-iceworks-dark',
      // themeConfig: {
      //   'sub-menu-bg': '#434557',
      //   'next-card-bg': '#434557',
      //   'next-card-border-color': '#333646',
      // },
      themePackage: [{
        name: '@alifd/theme-iceworks-dark',
        themeConfig: {
          'sub-menu-bg': '#434557',
          'next-card-bg': '#434557',
          'next-card-border-color': '#333646',
        },
      }, {
        name: '@alifd/theme-2',
        themeConfig: {
          'sub-menu-bg': '#fff',
          'next-card-bg': '#fff',
          'next-card-border-color': '#eee',
        },
      }],
    }],
  ],

  chainWebpack: (config) => {
    config.devServer.historyApiFallback(true);
  },
};
