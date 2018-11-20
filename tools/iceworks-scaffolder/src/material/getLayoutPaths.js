const path = require('path');
const uppercamelcase = require('uppercamelcase');

module.exports = function getLayoutPaths({ cwd, layout }) {
  const layoutClassName = uppercamelcase(layout.name);
  const layoutOutputPath = path.join(cwd, 'src', 'layouts', layoutClassName);
  return {
    outputPath: layoutOutputPath,
    relativePath: './layouts/' + layoutClassName,
  };
};
