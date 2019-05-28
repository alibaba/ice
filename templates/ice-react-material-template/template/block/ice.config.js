module.exports = {
  entry: 'demo/index.js',
  publicPath: './',
  outputAssetsPath: {
    css: '',
    js: '',
  },
  plugins: [
    ['ice-plugin-fusion', {}],
  ],
  chainWebpack: (config) => {
    config.plugin('HtmlWebpackPlugin').tap(args => [
      {...(args[0] || {}), template: require.resolve('./demo/index.html')},
    ]);
  },
};
