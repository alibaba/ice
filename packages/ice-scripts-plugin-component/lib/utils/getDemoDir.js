const { existsSync } = require('fs');
const { join } = require('path');

module.exports = function getDemoPath(projectDir) {
  let demoDir;
  // compatible with directory docs
  const searchDirs = ['demo', 'docs'];
  for (let i = 0; i < searchDirs.length; i++) {
    const searchPath = join(projectDir, searchDirs[i]);
    if (existsSync(searchPath)) {
      demoDir = searchDirs[i];
      break;
    }
  }
  return demoDir;
};
