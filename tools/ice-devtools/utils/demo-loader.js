const { parseMarkdownParts } = require('./markdown-helper');
const { join } = require('path');
const { existsSync } = require('fs');

module.exports = function demoLoader(markdown) {
  const { code, compiledCode, meta, content } = parseMarkdownParts(markdown);
  const stylePath = join(process.cwd(), 'src/main.scss');
  if (existsSync(stylePath)) {
    const styleReq = JSON.stringify(stylePath);
    return `require(${styleReq});` + compiledCode;
  } else {
    return compiledCode;
  }
}
