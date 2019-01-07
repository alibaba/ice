const path = require('path');
const pathExists = require('path-exists');

const removePageV3 = require('./removePageV3');
const removePageV4 = require('./removePageV4');

module.exports = async function({ destDir, pageFolderName, isNodeProject }) {
  const clientPath = isNodeProject ? 'client' : 'src';
  let routerConfigFilePath = path.join(destDir, clientPath, 'routerConfig.js');

  if (pathExists.sync(routerConfigFilePath)) {
    await removePageV4({ destDir, pageFolderName, isNodeProject });
  } else {
    await removePageV3({ destDir, pageFolderName, isNodeProject });
  }
};
