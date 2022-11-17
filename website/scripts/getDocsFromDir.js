const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

module.exports = function getDocsFromDir(dir) {
  // docs/
  const baseDir = path.join(__dirname, '../docs/');
  const docsDir = path.join(baseDir, dir);

  function getMarkdownOrder(filepath) {
    return (matter(fs.readFileSync(filepath, 'utf-8')).data || {}).order || 100;
  }

  function isDocHide(filepath) {
    return (matter(fs.readFileSync(filepath, 'utf-8')).data || {}).hide || false;
  }

  const docs = glob.sync('*.md', {
    cwd: docsDir,
    // ignore: 'README.md',
  });

  const result = docs
    .map((doc) => path.join(docsDir, doc))
    .filter((doc) => !isDocHide(doc))
    .sort((a, b) => {
      const orderA = getMarkdownOrder(a);
      const orderB = getMarkdownOrder(b);

      return orderA - orderB;
    })
    .map((filepath) => {
      // /Users/xxx/site/docs/guide/basic/router.md => guide/basic/router
      const id = path.relative(baseDir, filepath).replace(/\.md/, '');
      return id;
    });

  return result;
};
