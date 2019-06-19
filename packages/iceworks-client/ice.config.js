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
      themePackage: [{
        name: '@alifd/theme-iceworks-dark',
        themeConfig: {
          'panel-bg': '#333645',
          'panel-title-color': '#eee',
          'sub-menu-bg': '#434557',
          'global-bar-bg': '#434557',
        },
      }, {
        name: '@alifd/theme-iceworks-light',
        themeConfig: {
          'panel-bg': '#fff',
          'panel-title-color': '#333',
          'sub-menu-bg': '#fff',
          'global-bar-bg': '#5584FF',
        },
      }],
    }],
  ],

  chainWebpack: (config) => {
    config.devServer.historyApiFallback(true);
  },
};
