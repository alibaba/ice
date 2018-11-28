const path = require('path');
const pathExists = require('path-exists');

const removePreviewPageV3 = require('./removePreviewPageV3');
const removePreviewPageV4 = require('./removePreviewPageV4');
const { getClientPath } = require('../../paths');

module.exports = async function({ destDir, nodeFramework }) {
  const clientPath = getClientPath(destDir, nodeFramework);
  let routerConfigFilePath = path.join(clientPath, 'routerConfig.js');

  if (pathExists.sync(routerConfigFilePath)) {
    await removePreviewPageV4({ destDir, nodeFramework });
  } else {
    await removePreviewPageV3({ destDir, nodeFramework });
  }
};
