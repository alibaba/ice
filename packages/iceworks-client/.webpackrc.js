const path = require('path');

module.exports = (context) => {
  const { webpack } = context;
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
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
    ]
  };
};
