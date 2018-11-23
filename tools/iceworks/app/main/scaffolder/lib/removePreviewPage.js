const path = require('path');
const pathExists = require('path-exists');

const removePreviewPageV3 = require('./removePreviewPageV3');
const removePreviewPageV4 = require('./removePreviewPageV4');

module.exports = async function({ destDir, isNodeProject }) {
  const clientPath = isNodeProject ? 'client' : 'src';
  let routerConfigFilePath = path.join(destDir, clientPath, 'routerConfig.js');

  if (pathExists.sync(routerConfigFilePath)) {
    await removePreviewPageV4({ destDir, isNodeProject });
  } else {
    await removePreviewPageV3({ destDir, isNodeProject });
  }
};
