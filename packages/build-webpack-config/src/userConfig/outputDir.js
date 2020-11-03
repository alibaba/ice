const path = require('path');

module.exports = (config, outputDir, context) => {
  const { rootDir } = context;

  // outputPath：build/*
  const outputPath = path.resolve(rootDir, outputDir);

  config.output.path(outputPath);
};
