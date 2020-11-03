const path = require('path');
const { WEB } = require('../config/constants');
const defaultConfig = require('../config/default.config');

module.exports = (context, { target }) => {
  const { userConfig, rootDir } = context;
  let outputPath = path.join(rootDir, defaultConfig.outputDir);

  if (userConfig.outputDir) {
    outputPath = path.join(rootDir, userConfig.outputDir);
  } else if (target === WEB) {
    outputPath = path.join(context.rootDir, defaultConfig.outputDir, target);
  }

  return outputPath;
};
