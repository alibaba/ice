module.exports = {
  outputDir: 'build',
  publicPath: './',
  chainWebpack: (config) => {
    config
      .entryPoints.clear()
      .end()
      .entry('index')
      .add('./demo/index')
      .end();

    config
      .plugin('html')
      .tap((args) => {
        args[0].template = './demo/index.html';
        return args;
      });
  },
};
