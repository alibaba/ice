const { resolve } = require('path');
const { readFileSync } = require('fs');

function keys(obj) {
  return Object.keys(obj);
}
exports.keys = keys;

function getCwd() {
  return process.cwd();
}

function findMaterials() {
  const pkg = getPkgJson();
  if (!('materials' in pkg)) {
    return null;
  }
  return pkg.materials;
}
exports.findMaterials = findMaterials;

function getPkgJson() {
  const cwd = getCwd();
  const json = JSON.parse(readFileSync(resolve(cwd, 'package.json'), 'utf-8'));
  return json;
}
exports.getPkgJson = getPkgJson;
