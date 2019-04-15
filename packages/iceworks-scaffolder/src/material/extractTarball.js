const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const request = require('request');
const tar = require('tar');
const zlib = require('zlib');
const logger = require('../logger');

/**
 * 将 tarbar 下的内容下载到指定目录，同时做路径转换
 * @param {string} url tarball 下载地址
 * @param {string} output 目标路径
 * @param {string} source 源码对象描述
 *                 source.sourceCodeDirectory 源码存放的位置
 */
module.exports = function extractTarball({ url, output, srcPath, source = {} }) {
  // 保证目录存在
  // mkdirp.sync(dest);
  return new Promise((resolve, reject) => {
    const allFiles = [];
    request
      .get(url)
      .on('error', reject)
      .pipe(zlib.Unzip()) // eslint-disable-line babel/new-cap
      .pipe(tar.Parse()) // eslint-disable-line babel/new-cap
      .on('entry', (entry) => {
        // npm 会自动生成 .npmignore, 这里需要过滤掉
        const filterFileReg = /\.npmignore/;
        if (filterFileReg.test(entry.path)) {
          return;
        }

        let realPath = entry.path.replace(/^package\//, '');
        // 根据 source 的描述过滤文件内容
        const sourceCodeDirectory = source.sourceCodeDirectory || '';
        const isAssetsFile = realPath.startsWith('assets/');
        let destPath;
        logger.info(realPath, isAssetsFile);
        if (!isAssetsFile && sourceCodeDirectory) {
          // 存在 sourceCodeDirectory 则不符合的都过滤掉
          if (!realPath.startsWith(sourceCodeDirectory)) {
            return;
          }
          realPath = realPath.replace(sourceCodeDirectory, '');
          destPath = path.join(output, realPath);
        } else if (isAssetsFile) {
          realPath = realPath.replace(sourceCodeDirectory, '');
          destPath = path.join(srcPath, realPath);
        }

        // deal with _ started file
        // https://github.com/alibaba/ice/issues/226
        const parsedDestPath = path.parse(destPath);
        if (parsedDestPath.base == '_gitignore') {
          parsedDestPath.base = parsedDestPath.base.replace(/^_/, '.');
        }
        destPath = path.format(parsedDestPath);

        // 保证子文件夹存在
        mkdirp.sync(path.dirname(destPath));
        entry.pipe(fs.createWriteStream(destPath));
        allFiles.push(destPath);
      })
      .on('end', () => {
        resolve(allFiles);
      });
  });
};
