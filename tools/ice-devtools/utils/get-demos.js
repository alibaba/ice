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
      const content = readFileSync(join(demoPath, filename), 'utf-8');
      const { meta } = parseMarkdownParts(content);
      filename = filename.replace(/\.md$/, '');
      const href = `/preview/?demo=${filename}`;
      return { href, filename, ...meta };
    });
};
