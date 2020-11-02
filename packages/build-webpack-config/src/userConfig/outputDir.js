const path = require('path');
const { WEB } = require('../constants');

module.exports = (config, outputDir, context) => {
  const { rootDir, userConfig: { targets = [] } } = context;

  // outputPath：build/*
  let outputPath = path.resolve(rootDir, outputDir);
  if (targets.includes(WEB)) {
    // outputPath：build/web/*
    outputPath = path.resolve(rootDir, outputDir, WEB);
  }

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
