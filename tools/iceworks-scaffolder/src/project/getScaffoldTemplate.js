const fs = require('fs');
const junk = require('junk');
const path = require('path');
const pathExists = require('path-exists');

async function findScaffoldTemplate(targetPath) {
  if (!pathExists.sync(targetPath)) {
    return [];
  }
  let files = fs.readdirSync(targetPath).filter(junk.not);
  files = files.map((n) => path.join(targetPath, n));
  return files;
}

module.exports = async function getScaffoldTemplate(pageFolder) {
  const pageTemplate = await findScaffoldTemplate(pageFolder);

  return {
    page: pageTemplate,
  };
};
