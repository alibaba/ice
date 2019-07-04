const { resolve } = require('path');

module.exports = {
  publicPath: 'https://unpkg.com/iceworks-client@latest/build/',

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
          'tip-icon-color': '#6B6F83',
          'sub-menu-bg': '#434557',
          'global-bar-bg': '#434557',
          'material-card-shadow': 'rgba(0, 0, 0, 0)',
          'text-color-inverse': '#e4e4e4',
        },
      }, {
        name: '@alifd/theme-iceworks-light',
        themeConfig: {
          'panel-bg': '#fff',
          'panel-title-color': '#333',
          'tip-icon-color': '#BAD9FF',
          'sub-menu-bg': '#fff',
          'global-bar-bg': '#5584FF',
          'material-card-shadow': 'rgba(163, 177, 191, 0.35)',
          'text-color-inverse': '#fff',
        },
      }],
    }],
  ],

  chainWebpack: (config) => {
    config.devServer.historyApiFallback(true);
  },
};
