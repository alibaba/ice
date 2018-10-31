const path = require('path');
const uppercamelcase = require('uppercamelcase');

module.exports = function getLayoutPaths({ cwd, layout, isNodeProject = false }) {
  const layoutClassName = uppercamelcase(layout.name);
  const feFolder = isNodeProject ? 'client' : 'src';
  const layoutOutputPath = path.join(cwd, feFolder, 'layouts', layoutClassName);
  return {
    outputPath: layoutOutputPath,
    relativePath: './layouts/' + layoutClassName,
  };
};
