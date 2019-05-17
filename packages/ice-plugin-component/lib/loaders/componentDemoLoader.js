const { join, basename } = require('path');
const { existsSync } = require('fs');
const { getOptions } = require('loader-utils');

module.exports = function demoLoader(markdown) {
  const options = getOptions(this) || {};
  const { compiledCode } = options.parser(markdown, {
    sliceCode: true,
  });
  const stylePath = join(process.cwd(), 'src/main.scss');

  const filePath = this.resourcePath;
  const fileName = basename(filePath, '.md');
  const mountNode = `var mountNode = document.getElementById('${fileName}');`;

  if (existsSync(stylePath)) {
    const styleReq = JSON.stringify(stylePath);
    return `${mountNode}require(${styleReq});${compiledCode}`;
  }
  return mountNode + compiledCode;
};
