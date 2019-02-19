const path = require('path');
const uppercamelcase = require('uppercamelcase');
const { getClientFolderName } = require('../utils');

module.exports = function getLayoutPaths({ cwd, layout, nodeFramework = '' }) {
  const layoutClassName = uppercamelcase(layout.name);
  const clientFolder = getClientFolderName(nodeFramework);
  const layoutOutputPath = path.join(cwd, clientFolder, 'layouts', layoutClassName);
  return {
    outputPath: layoutOutputPath,
    relativePath: './layouts/' + layoutClassName,
  };
};
