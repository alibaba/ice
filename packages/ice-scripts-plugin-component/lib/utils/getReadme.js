const fs = require('fs');
const path = require('path');

module.exports = function getReadme(cwd, markdownParser) {
  const filePath = path.join(cwd, 'README.md');
  const markdown = fs.readFileSync(filePath, 'utf-8');
  const { content: readme, meta = {} } = markdownParser(markdown);

  return {
    meta,
    readme,
  };
};
