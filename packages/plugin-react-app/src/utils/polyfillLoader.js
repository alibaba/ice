const { extname } = require('path');

module.exports = function(content) {
  // Polyfill code needn't be added into json file.
  if (extname(this.resourcePath) === '.json') {
    return content;
  }
  return `
import "core-js/stable";
import "regenerator-runtime/runtime";
${content}
  `;
};
