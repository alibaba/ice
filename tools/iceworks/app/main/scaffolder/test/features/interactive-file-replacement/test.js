const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const request = require('request');
const InteractiveFileReplacement = require('../../../lib/interactiveFileReplacement');

const tmpDirectory = path.join(__dirname, 'tmp');
rimraf.sync(tmpDirectory);
mkdirp.sync(tmpDirectory);

module.exports = async () => {
  let filePath = path.join(tmpDirectory, 'src/routes.jsx');
  if (!fs.existsSync(filePath)) {
    // hack 兼容 vue 物料 router
    filePath = path.join(tmpDirectory, 'src/router.js');
  }

  fs.writeFileSync(
    filePath,
    `
// <!-- replace start -->
const foo = [];
// <!-- replace end -->
const bar = [1, 3, 4];
export default [...foo, ...bar];
  `
  );

  const i = new InteractiveFileReplacement({
    file: filePath,
    tagPrefix: '// <!-- replace start -->',
    tagSuffix: '// <!-- replace end -->',
  });
  i.replace("const foo = ['hello', 'world'];");

  const file = fs.readFileSync(filePath, 'utf-8');
  file.should.match(/hello/);

  rimraf.sync(tmpDirectory);
};
