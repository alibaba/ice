const { resolve } = require('path');

module.exports = (context) => {
  const { webpack } = context;
  return {
    devServer: {
      historyApiFallback: true,
    },
    resolve: {
      alias: {
        '@src': resolve(__dirname, 'src/'),
        '@layouts': resolve(__dirname, 'src/layouts/'),
        '@components': resolve(__dirname, 'src/components/'),
        '@utils': resolve(__dirname, 'src/utils/'),
        '@store': resolve(__dirname, 'src/store/'),
        '@models': resolve(__dirname, 'src/models/'),
        '@hooks': resolve(__dirname, 'src/hooks'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
    ],
  };
};
