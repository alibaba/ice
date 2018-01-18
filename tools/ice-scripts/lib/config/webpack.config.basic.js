const getPublicPath = require('./getPublicPath');

module.exports = function getWebpackConfigBasic(entry, paths, options = {}) {
  let webpackConfig = {
    devtool: 'cheap-module-source-map',
    context: paths.appDirectory,
    entry: entry,
    output: Object.assign({
      path: paths.appBuild, // 云构建是 .package 目录
      filename: '[name].js',
      publicPath: getPublicPath() || '/dist/' // 云构建需要读取分支版本号
    }),
    resolve: {
      modules: [paths.appNodeModules, 'node_modules'],
      extensions: ['.js', '.jsx', '.json', '.html']
    },
    externals: {
      react: 'window.React',
      'react-dom': 'window.ReactDOM'
    },
    module: {
      rules: require('./getRules')(paths, options)
    },
    plugins: require('./getPlugins')(paths, options)
  };

  return webpackConfig;
};
