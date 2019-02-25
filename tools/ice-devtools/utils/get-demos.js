const { readdirSync, readFileSync, existsSync } = require('fs');
const { join } = require('path');

const { parseMarkdownParts } = require('./markdown-helper');

module.exports = function getDemos(projectDir) {
  const demoPath = join(projectDir, 'demo');
  if (!existsSync(demoPath)) {
    return [];
  }

  return readdirSync(demoPath)
    .filter(file => /\.md$/.test(file))
    .map((filename) => {
      const filePath = join(demoPath, filename);
      const content = readFileSync(filePath, 'utf-8');

      const { meta, highlightedCode, content: markdownContent } = parseMarkdownParts(content);

      filename = filename.replace(/\.md$/, '');
      const href = `/preview/?demo=${filename}`;

      return { 
        href, 
        filename, 
        filePath, 
        ...meta, 
        highlightedCode, 
        markdownContent, 
      };
    }).sort(function (a, b) {
      return a.order - b.order;
    });
};
