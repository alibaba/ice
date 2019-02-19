const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const request = require('request');
const requestProgress = require('request-progress');
const zlib = require('zlib');
const tar = require('tar');
const logger = require('../../logger');
const { DetailError } = require('../../error-handler');

/**
 * 将 tarbar 下的内容下载到指定目录，同时做路径转换
 * @param {string} tarballURL tarball 下载地址
 * @param {string} destDir 目标路径
 * @param {string} source 源码对象描述
 *                 source.sourceCodeDirectory 源码存放的位置
 */
module.exports = function extractTarball(
  tarballURL,
  destDir,
  source = {},
  progressFunc = () => {},
  afterCreateRequest = () => {}
) {
  // 保证目录存在
  // mkdirp.sync(dest);
  return new Promise((resolve, reject) => {
    const allFiles = [];
    const directoryCollector = [];
    const allWriteStream = [];

    const req = requestProgress(
      request({
        url: tarballURL,
      })
    );

    afterCreateRequest(req);

    req
      .on('progress', (state) => {
        progressFunc(state);
      })
      .on('error', (error = {}) => {
        reject(new DetailError(`链接 ${tarballURL} 请求失败`, {
          message: error.message,
          stack: error.stack,
        }));
      })
      .pipe(zlib.Unzip()) // eslint-disable-line babel/new-cap
      .on('error', (error) => {
        reject(new DetailError('已中止创建', {
          message: '',
          stack: '',
        }));
      })
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

        if (sourceCodeDirectory) {
          // 存在 sourceCodeDirectory 则不符合的都过滤掉
          if (!realPath.startsWith(sourceCodeDirectory)) {
            return;
          }
          realPath = realPath.replace(sourceCodeDirectory, '');
        }

        let destPath = path.join(destDir, realPath);
        // deal with _ started file
        // https://github.com/alibaba/ice/issues/226
        const parsedDestPath = path.parse(destPath);
        if (parsedDestPath.base == '_gitignore') {
          parsedDestPath.base = parsedDestPath.base.replace(/^_/, '.');
        }
        destPath = path.format(parsedDestPath);

        // 保证子文件夹存在
        const needCreateDir = path.dirname(destPath);
        if (!directoryCollector.includes(needCreateDir)) {
          directoryCollector.push(needCreateDir);
          mkdirp.sync(path.dirname(destPath));
        }
        logger.info('extractTarball', destPath);
        allFiles.push(destPath);
        const writeStream = new Promise(streamResolve => {
          entry
            .pipe(fs.createWriteStream(destPath))
            .on('finish', () => streamResolve());
        });
        allWriteStream.push(writeStream);
      })
      .on('end', () => {
        logger.info('end', tarballURL);
        progressFunc({
          percent: 1,
        });
        Promise
          .all(allWriteStream)
          .then(() => resolve(allFiles))
          .catch(() => {
            reject(new DetailError('写入文件失败'));
          });
      });
  });
};
