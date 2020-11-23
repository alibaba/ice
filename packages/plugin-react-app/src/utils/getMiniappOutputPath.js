const fs = require('fs-extra');
const path = require('path');
const { MINIAPP } = require('../constants');

module.exports = (context, options = {}) => {
  const { rootDir, userConfig } = context;
  const { outputDir } = userConfig;
  const output = path.resolve(rootDir, outputDir);

  fs.ensureDirSync(output);

  return path.resolve(output, options.target || MINIAPP);
};
