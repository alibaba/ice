const path = require('path');
const { WEB } = require('../constants');
const defaultConfig = require('../config/default.config');

module.exports = (context, { target }) => {
  const { userConfig } = context;
  let outputPath = defaultConfig.outputDir;

  if (userConfig.outputDir) {
    outputPath = userConfig.outputDir;
  } else if (target === WEB) {
    outputPath = path.join(context.rootDir, defaultConfig.outputDir, target);
  }

  return outputPath;
};
