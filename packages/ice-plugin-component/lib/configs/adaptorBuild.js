const path = require('path');
const getPackageVersion = require('../utils/getPackageVersion');

module.exports = (config, { rootDir }) => {
  const pkgVersion = getPackageVersion(['react', 'react-dom', '@alifd/next', 'moment'], rootDir);
  config.plugin('HtmlWebpackPlugin').tap(() => [{
    template: require.resolve('../template/build.html'),
    filename: 'index.html',
    templateParameters: {
      pkgVersion,
    },
  }]);
  // output umd
  config.output
    .library('Adaptor')
    .libraryExport('default')
    .libraryTarget('umd');
  config.output.path(path.resolve(rootDir, 'build/adaptor'));
  config.entryPoints.clear();
  config.merge({
    entry: { adaptor: [path.resolve(rootDir, 'src/main.scss'), path.resolve(rootDir, 'adaptor/index.js')] },
  });
  config.externals({
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDom',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
    '@alifd/next': {
      root: 'Next',
      commonjs: '@alifd/next',
      commonjs2: '@alifd/next',
      amd: '@alifd/next',
    },
    moment: {
      root: 'moment',
      commonjs: 'moment',
      commonjs2: 'moment',
      amd: 'moment',
    },
  });
};
