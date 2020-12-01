const path = require('path');

module.exports = (context) => {
  const { userConfig: { outputDir }, rootDir } = context;

  return path.join(rootDir, outputDir);
};
