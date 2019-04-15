const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

/**
 * 将自定义区块写入到指定位置
 * @param {array} block 区块
 * @param {string} output 目标路径
 */
module.exports = function extractTarball({ block, output }) {
  return new Promise((resolve) => {
    const allFiles = [];
    let codeFileTree = block.code;
    mkdirp.sync(output);
    fs.writeFileSync(path.join(output, 'index.jsx'), codeFileTree['index.jsx']);
    allFiles.push(path.join(output, 'index.jsx'));
    resolve(allFiles);
  });
};
