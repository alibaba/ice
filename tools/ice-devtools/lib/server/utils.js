const { resolve } = require('path');
const { readdirSync, readFileSync } = require('fs');
const glob = require('glob-promise');
const getMaterialLists = require('./getMaterialLists');

exports.getBlockList = function getBlockList(space) {
  return glob('blocks/*', { cwd: space }).then((files) => {
    return files.map((file) => file.slice('blocks/'.length));
  });
};

exports.getMaterials = function getMaterials(space) {
  try {
    return JSON.parse(readFileSync(resolve(space, 'package.json'), 'utf-8'))
      .materials;
  } catch (err) {
    throw new Error('material 字段不存在 package.json 中');
  }
};

exports.getMaterialList = function getMaterialList(currentMaterial) {
  const materialsAll = getMaterialLists(process.cwd());
  const materials = materialsAll[currentMaterial];

  let blocks = [];
  let layouts = [];

  if (materials) {
    Object.keys(materials).forEach((key) => {
      if (materials[key]['type'] === 'block') {
        blocks.push(materials[key]);
      } else if (materials[key]['type'] === 'layout') {
        layouts.push(materials[key]);
      }
    });
  }

  return {
    blocks,
    layouts
  }
}
