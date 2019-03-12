const { parseMarkdownParts } = require('./markdown-helper');
const { join, basename } = require('path');
const { existsSync } = require('fs');

module.exports = function demoLoader(markdown) {
  const { code, compiledCode, meta, content } = parseMarkdownParts(markdown);
  const stylePath = join(process.cwd(), 'src/main.scss');

  const filePath = this.resourcePath;
  const fileName = basename(filePath, '.md');
  const mountNode = `var mountNode = document.getElementById('${fileName}');`;

  if (existsSync(stylePath)) {
    const styleReq = JSON.stringify(stylePath);
    return `${mountNode}require(${styleReq});` + compiledCode;
  } else {
    return mountNode + compiledCode;
  }
}
