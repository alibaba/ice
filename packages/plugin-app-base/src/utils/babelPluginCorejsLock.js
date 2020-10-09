const path = require('path');

const coreJSPath = path.dirname(require.resolve('core-js/package.json'));
// eslint-disable-next-line no-unused-vars
module.exports = ({ types }, { fileList }) => {
  return {
    visitor: {
      ImportDeclaration(nodePath, state) {
        const entryFile = fileList.find((filePath) => {
          // filePath may not have an extension
          return filePath.includes((state.filename || '').replace(/\.[^/.]+$/, ''));
        });
        if (entryFile) {
          const { node } = nodePath;
          // only replace core-js/modules/xxx added by @babel/preset-env
          if (node.source.value.startsWith('core-js/modules')) {
            node.source.value = node.source.value.replace('core-js/', `${coreJSPath}/`);
          }
        }
      },
    },
  };
};
