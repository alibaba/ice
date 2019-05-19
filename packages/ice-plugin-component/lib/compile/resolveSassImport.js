const fs = require('fs');
const path = require('path');

module.exports = function resolveSassFile(sassFile) {
  const reg = /@import[ ]*(url\()?[("' ]?([^)'"\s]*)/g;
  // get sass content
  let sassContent = '';
  try {
    sassContent = fs.readFileSync(sassFile);
  } catch (e) {
    console.log('Can not open sass file', sassFile);
  }
  return sassContent.replace(reg, (importStr) => {
    if (importStr) {
      const [,,importPath] = reg.exec(importStr);
      console.log(importPath);
      console.log(path.basename(importPath));
      console.log(path.extname(importPath));
      // return resolveSassFile(importPath);
    }
  });
};
