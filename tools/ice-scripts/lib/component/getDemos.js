/**
 * get demos from demo dir
 */
const { readdirSync, readFileSync, existsSync } = require('fs');
const { join } = require('path');

const { parseMarkdownParts } = require('./markdownHelper');

module.exports = function getDemos(projectDir) {
  const demoPath = join(projectDir, 'demo');
  if (!existsSync(demoPath)) {
    return [];
  }

  return readdirSync(demoPath)
    .filter((file) => /\.md$/.test(file))
    .map((filename) => {
      const filePath = join(demoPath, filename);
      const content = readFileSync(filePath, 'utf-8');

      const { meta, highlightedCode, content: markdownContent } = parseMarkdownParts(content, {
        sliceCode: true,
      });

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
    }).sort((a, b) => {
      return a.order - b.order;
    });
};
