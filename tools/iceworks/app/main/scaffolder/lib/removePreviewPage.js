const path = require('path');
const pathExists = require('path-exists');

const { getClientPath } = require('../../paths');
const removePageV3 = require('./removePageV3');
const removePageV4 = require('./removePageV4');

module.exports = async function({ destDir, nodeFramework }) {
  const clientPath = getClientPath(destDir, nodeFramework, 'src');
  let routerConfigFilePath = path.join(clientPath, 'routerConfig.js');

  if (pathExists.sync(routerConfigFilePath)) {
    await removePreviewPageV4({ destDir, nodeFramework });
    await removePageV4({ 
      destDir, 
      isNodeProject,
      pageFolderName: 'IceworksPreviewPage',
      routerPath: '/IceworksPreviewPage'
     });
  } else {
    await removePageV3({ 
      destDir, 
      isNodeProject,
      pageFolderName: 'IceworksPreviewPage'
    });
  }
};
