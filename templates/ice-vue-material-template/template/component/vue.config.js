module.exports = {
    outputDir: 'build',
    publicPath: './',
    pages: {
        index: {
            entry: 'demo/index.js',
            template: 'demo/index.html',
            filename: 'index.html'
        }
    },
    chainWebpack: config => {
        config.module
            .rule('js')
            .include.add(/src/).end()
            .include.add(/demo/).end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                return options;
            });
    }
};
