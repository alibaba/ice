const path = require('path');
const demoRouter = require('../utils/demoRouter');

module.exports = (config, { pkg, markdownParser, demos, hasAdaptor, demoDir, rootDir }) => {
  // disable vendor
  config.optimization.splitChunks({ cacheGroups: {} });
  // remove CopyWebpackPlugin (component compile do not have public folder)
  config.plugins.delete('CopyWebpackPlugin');
  // add demo loader
  config.module.rule('demo-loader').test(/\.md$/i).use('demo')
    .loader(require.resolve('../loaders/componentDemoLoader'))
    .options({ parser: markdownParser });
  // modify webpack devServer
  config.devServer
    .after(demoRouter({ rootDir, markdownParser, demos, pkg, hasAdaptor, demoDir }))
    .contentBase(false);
  // add packagename to webpack alias
  config.resolve.alias
    .set(pkg.name, path.resolve(rootDir, 'src/index'));
};
