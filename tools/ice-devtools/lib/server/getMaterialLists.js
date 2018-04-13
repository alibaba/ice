const path = require('path');
const fs = require('fs');
const upperCamelCase = require('uppercamelcase');

function getBlockEntries(dir, material) {
  let result = {};
  const blockDirs = fs.readdirSync(path.join(dir, material, 'blocks'));
  const layoutDirs = fs.readdirSync(path.join(dir, material, 'layouts'));

  blockDirs.forEach((dirName) => {
    const fullPath = path.join(dir, material, 'blocks', dirName);
    if (fs.existsSync(fullPath) && isDirectory(fullPath)) {
      const pkgData = require(path.join(fullPath, 'package.json'));
      result[pkgData.blockConfig.name] = {
        type: 'block',
        material: material,
        className: upperCamelCase(pkgData.blockConfig.name),
        name: pkgData.blockConfig.name,
        title: pkgData.blockConfig.title,
        categories: pkgData.blockConfig.categories,
        snapshot: pkgData.blockConfig.snapshot,
        description: pkgData.description,
        author: pkgData.author,
        [`${material}/blocks/${dirName}`]: path.join(fullPath, 'src/index.js'),
      };
    }
  });

  layoutDirs.forEach((dirName) => {
    const fullPath = path.join(dir, material, 'layouts', dirName);
    if (fs.existsSync(fullPath) && isDirectory(fullPath)) {
      const pkgData = require(path.join(fullPath, 'package.json'));
      result[pkgData.layoutConfig.name] = {
        type: 'layout',
        material: material,
        className: upperCamelCase(pkgData.layoutConfig.name),
        name: pkgData.layoutConfig.name,
        title: pkgData.layoutConfig.title,
        categories: pkgData.layoutConfig.categories,
        snapshot: pkgData.layoutConfig.snapshot,
        description: pkgData.description,
        author: pkgData.author,
        [`${material}/layouts/${dirName}`]: path.join(fullPath, 'src/index.js'),
      };
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
  checkMaterial(pkg);

  Object.keys(pkg.materials)
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

function checkMaterial(pkg) {
  if (!('materials' in pkg)) {
    throw new Error(
      '物料源数据不存在, 请确认 package.json 中包含 materials 字段'
    );
  }
}
