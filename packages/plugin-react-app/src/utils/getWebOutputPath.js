const path = require('path');
const { getDefaultConfig } = require('build-webpack-config');
const { WEB } = require('../constants');

module.exports = (context, { target }) => {
  const { userConfig, rootDir } = context;
  const defaultConfig = getDefaultConfig();

  let outputPath = path.join(rootDir, defaultConfig.outputDir);

  if (userConfig.outputDir) {
    outputPath = path.join(rootDir, userConfig.outputDir);
  } else if (target === WEB) {
    outputPath = path.join(context.rootDir, defaultConfig.outputDir, target);
  }

  return outputPath;
};
