const path = require('path');

module.exports = ({ context, chainWebpack }, outputDir) => {
  const { rootDir } = context;
  chainWebpack((config) => {
    const outputPath = path.resolve(rootDir, outputDir);
    config.output.path(outputPath);
    // copy public folder to outputDir
    // copy-webpack-plugin patterns must be an array
    config.plugin('CopyWebpackPlugin').tap(([args]) => [[{
      ...(args[0] || {}),
      to: outputPath,
    }]]);
  });
};
