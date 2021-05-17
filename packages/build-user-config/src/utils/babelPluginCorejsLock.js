const path = require('path');
const { addSideEffect } = require('@babel/helper-module-imports');

const coreJSPath = path.dirname(require.resolve('core-js/package.json'));
// eslint-disable-next-line no-unused-vars
module.exports = ({ types }, { fileList }) => {
  return {
    visitor: {
      Program: {
        exit(programPath, state) {
          const entryFile = fileList.find((filePath) => {
            // filePath may not have an extension
            return filePath.includes((state.filename || '').replace(/\.[^/.]+$/, ''));
          });
          if (entryFile) {
            programPath.traverse({
              ImportDeclaration(nodePath) {
                const { node } = nodePath;
                // only replace core-js/modules/xxx added by @babel/preset-env
                if (node.source.value.startsWith('core-js/modules')) {
                  const file = nodePath && nodePath.hub && nodePath.hub.file || state && state.file;
                  // add core-js import declaration at the top of file, Fix: https://github.com/alibaba/ice/issues/4276
                  addSideEffect(file.path, node.source.value.replace('core-js/', `${coreJSPath}/`));
                  nodePath.remove();
                }
              },
            });
          }
        }
      },
    },
  };
};
