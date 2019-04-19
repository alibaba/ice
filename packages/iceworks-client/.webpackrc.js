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
        '@hooks': resolve(__dirname, 'src/hooks'),
        '@models': resolve(__dirname, 'src/models'),
        '@utils': resolve(__dirname, 'src/utils/'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
    ]
  };
};
