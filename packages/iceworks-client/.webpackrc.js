const path = require('path');

module.exports = (context) => {
  return {
    devServer: {
      historyApiFallback: true,
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
      },
    },
  };
};
