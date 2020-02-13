const pathExists = require('path-exists');

/**
 * Check path if it is exist
 * @param filePaths path array of file
 */

module.exports = (filePaths) => {
  let i = 0;
  while (i < filePaths.length) {
    if (pathExists.sync(filePaths[i])) {
      return filePaths[i];
    }
    i += 1;
  }
  return '';
};
