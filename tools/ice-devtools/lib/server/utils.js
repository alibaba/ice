const { resolve } = require('path');
const { readdirSync } = require('fs');
const glob = require('glob-promise');

exports.getBlockList = function getBlockList(space) {
  return glob('blocks/*', { cwd: space }).then((files) => {
    return files.map((file) => file.slice('blocks/'.length));
  });
};
