const { resolve } = require('path');

console.log(resolve(__dirname, './src/index.js'));

module.exports = {
  outputDir: 'build',
  publicPath: './',
  chainWebpack: (config) => {
    config
      .entryPoints.clear()
      .end()
      .entry('index')
      .add('./demo/index.js')
      .end();

    config
      .externals({
        vue: 'Vue',
      });

    config
      .plugin('html')
      .tap((args) => {
        args[0].template = './demo/index.html';
        return args;
      });
  },
};
