const path = require('path');

module.exports = ({ context, chainWebpack }, outputDir) => {
  const { rootDir } = context;
  chainWebpack((config) => {
    config.output.path(path.resolve(rootDir, outputDir));
  });
};
