const { resolve } = require('path');

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
