module.exports = (config, outputDir, context) => {
  const { userConfig } = context;

  // copy public folder to outputDir
  // copy-webpack-plugin patterns must be an array
  if (config.plugins.get('CopyWebpackPlugin') && userConfig.outputPath) {
    config.plugin('CopyWebpackPlugin').tap(([args]) => [[{
      ...(args[0] || {}),
      to: userConfig.outputPath,
    }]]);
  }
};
