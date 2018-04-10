const path = require('path');
const fs = require('fs');

function getBlockEntries(dir, material) {
  const result = {};
  const blockDirs = fs.readdirSync(path.join(dir, material, 'blocks'));

  blockDirs.forEach((dirName) => {
    const fullPath = path.join(dir, material, 'blocks', dirName);
    if (fs.existsSync(fullPath) && isDirectory(fullPath)) {
      result[`${material}/${dirName}`] = path.join(fullPath, 'src/index.js');
    }
  });
  return result;
}

module.exports = function getMaterialLists(dir) {
  const pkgPath = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error('package.json 文件不存在');
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  const result = {};

  Object.keys(pkg.marterials)
    .map((m) => {
      return {
        key: m,
        path: path.join(dir, m),
      };
    })
    .filter(({ path }) => {
      return fs.existsSync(path);
    })
    .forEach(({ key, path }) => {
      result[key] = getBlockEntries(dir, key);
    });

  return result;
};

function isDirectory(pathString) {
  return fs.lstatSync(pathString).isDirectory();
}
