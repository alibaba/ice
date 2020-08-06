const path = require('path');

module.exports = (config, outputDir, context) => {
  const { rootDir } = context;

  const outputPath = path.resolve(rootDir, outputDir);
  config.output.path(outputPath);
  // copy public folder to outputDir
  // copy-webpack-plugin patterns must be an array
  if (config.plugins.get('CopyWebpackPlugin')) {
    config.plugin('CopyWebpackPlugin').tap(([args]) => [[{
      ...(args[0] || {}),
      to: outputPath,
    }]]);
  }
};
