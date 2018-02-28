'use strict';

const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const glob = require('glob');
const debug = require('debug')('ice:generator:render');
const uuid = require('uuid');
const chalk = require('chalk');
const write = require('write');

/**
 * 将一个文件的模板内容进行渲染
 *
 * @param {String} filePath
 * @param {Object} data 模板对应数据
 * @param {String} abcPath
 * @return {Promise}
 */
function renderFile(sourceFile, filePath, data, abcPath) {
  debug('renderFile', sourceFile, filePath, data, abcPath);
  filePath = filePath
    .replace(/[_\.]_pageName__/, data.pageName)
    .replace(/[_\.]_className__/, data.className)
    .replace(/[_\.]_moduleName__/, data.moduleName)
    .replace(/[_\.]_npmName__/, data.npmName);

  return new Promise((resolve, reject) => {
    fs.readFile(sourceFile, 'utf-8', (err, content) => {
      if (err) {
        return reject(err);
      }
      const renderedContent = ejs.render(content, data);

      write(filePath, renderedContent, (err) => {
        if (err) {
          return reject(err);
        }

        debug('abcPath', abcPath, 'relative', path.relative(abcPath, filePath));
        console.log(
          chalk.green('  create  ', path.relative(abcPath, filePath))
        );
        resolve();
      });
    });
  });
}

exports.renderFile = renderFile;

/**
 * 将一个目录下的所有文件遍历渲染
 * @param  {Strign} sourceDirPath  模板所在目录一个临时文件夹
 * @param  {String} destDirPath   目标文件夹
 * @param  {Object} data          数据，使用 ejs 渲染
 * @param  {String} abcPath       abc.json 路径
 * @return {Promise}
 */
exports.renderDir = function(sourceDirPath, destDirPath, data, abcPath) {
  const defaultData = {
    // project
    uuid: uuid(),
    iceType: 'fed',
    // component
    version: '0.1.0',
    chinese: '',
    description: '',
    authorName: '',
    authorEmail: '',
  };

  data = Object.assign(defaultData, data);

  debug(sourceDirPath, destDirPath, data);

  return new Promise(function(resolve, reject) {
    glob(
      '**/*',
      {
        // 获取 sourceDirPath 目录下所有文件内容
        cwd: sourceDirPath,
        nodir: true,
        dot: true,
      },
      function(err, files) {
        if (err) {
          return reject(err);
        }

        debug('glob dir files', files);

        const queue = files.map((file) => {
          let destFileName = file;
          // npm 发布时会合并所有层级的 package.json, 因此模板里不能用 package.json 的文件名
          // _package.json -> package.json
          if (destFileName === '_package.json') {
            destFileName = 'package.json';
          } else if (destFileName.startsWith('_')) {
            destFileName = destFileName.replace(/^_/, '.');
          }

          const destFileAbsolutePath = path.resolve(destDirPath, destFileName); // 生成文件的绝对路径
          const sourceFileAbsolutePath = path.resolve(sourceDirPath, file);
          return renderFile(
            sourceFileAbsolutePath,
            destFileAbsolutePath,
            data,
            abcPath
          );
        });

        Promise.all(queue)
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      }
    );
  });
};
